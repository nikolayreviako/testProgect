class MenuScroller{
	slideChangingTime = 0.3; //время переключения слайда, с;
	constructor(){
		this.executeMainPart();
	}	
	//выполняем основную часть;
	executeMainPart(){
		console.log('выполняем основную часть');
	//	jQuery('body,html').scrollTop(0);
		window.scrollTo(0,0);
		var items = document.querySelectorAll('.custom-tub'), item;
		for (var i = 0; i < items.length; i++){
			item = items[i];
			item.itemIndex = i;
			item.onclick = this.itemClickMeth;
		}
		this.items = items;
		jQuery(items[0]).click();
		document.body.classList.add('hiddenBottomPart');
		this.addScroll();
	}
	//добавляем скрол;
	addScroll(){
		jQuery('body').on('wheel',(evt) => {	
			console.log('верхний скрол: ' + jQuery(document.body).scrollTop());
			console.log('высота баннера' + parseInt(jQuery('.menu').css('height')));
			if (jQuery(document.body).scrollTop() > parseInt(jQuery('.menu').css('height'))){
				console.log('баннер вне поля зрения');
				return;
			}
			if (this.slideChangingProcess){
				return;
			}
			var activeItemIndex = this.getActiveItemIndex(),
			nextActiveItemIndex;
			if (evt.originalEvent.wheelDelta >= 0) {
			//	console.log('скролим вверх');
				nextActiveItemIndex = activeItemIndex - 1;		
				if (!document.body.classList.contains('hiddenBottomPart')){
					document.body.classList.add('hiddenBottomPart');
				//	jQuery(document.body).scrollTop(0);
					jQuery(document.body).stop().animate({scrollTop: 0},700,'linear',() => {});
					this.slideChangingProcess = true;
					window.setTimeout(() => {
						this.slideChangingProcess = false;
					},this.slideChangingTime*1000);					
					return;
				}				
			}
			else{
			//	console.log('скролим вниз');
				nextActiveItemIndex = activeItemIndex + 1;			
			}
			if (nextActiveItemIndex == this.items.length || nextActiveItemIndex < 0){
				if (nextActiveItemIndex == this.items.length){
					if (document.body.classList.contains('hiddenBottomPart')){
						document.body.classList.remove('hiddenBottomPart')
					}					
				}
				return;
			}			
			this.slideChangingProcess = true;
			jQuery(this.items[nextActiveItemIndex]).click();
			window.setTimeout(() => {
				this.slideChangingProcess = false;
			},this.slideChangingTime*1000);
		});
	}
	//получаем активный пункт;
	getActiveItem(){
		return document.querySelectorAll('.custom-tub.active')[0];
	}
	//получаем индекс активного пункта;
	getActiveItemIndex(){
		return this.getActiveItem().itemIndex;
	}
	//метод клика по пункту;
	itemClickMeth = (evt) => {
		var item = evt.currentTarget || evt.target,
		activeItem = this.getActiveItem();
		if (item != activeItem){
			if (activeItem){
				activeItem.classList.remove('active');
			}			
			item.classList.add('active');
		}
	}	
}