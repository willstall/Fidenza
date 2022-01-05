(function() {
    function Modal()
    {
    	this.Container_constructor();
    }

    var p = createjs.extend( Modal, createjs.Container );

        p.continueSetup = function()
        {
            var background = new createjs.Shape();
            var width = 500;
            var height = 300;

            background.graphics.beginFill( "#FFF" )
                .drawRoundRect(0,0, width, height, 30);

            background.x = -width/2;
            background.y = -height/2;

            background.shadow = new createjs.Shadow("rgba(0,0,0,.05)", 0, 0, 40 );



            var button = new createjs.Container();
            var bkg = new createjs.Shape();

            var img = new createjs.Bitmap("img/smexy.png");

            var text = new createjs.Text( "Keep Going!", "600 15px 'Gloria Hallelujah'", "#FFF" );
                text.textAlign = "center";
                text.textBaseline = "middle";
                text.x = 125;
                text.y = 20;

            var fillCommand = bkg.graphics.beginFill( "#29AFDD" ).command;

                bkg.graphics.drawRoundRect(0, 0, 250, 40, 10);

            img.x = -93;
            img.y = -80;

            bkg.shadow = new createjs.Shadow("#3A73B7", 0, 8, 0);


            button.addChild( bkg, text );
            button.mouseChildren = false;

            button.on("mouseover", () => {
                fillCommand.style = "#F6962B";
                bkg.shadow.color = "#C39053";
            });

            button.on("mouseout", () => {
                fillCommand.style = "#29AFDD";
                bkg.shadow.color = "#3A73B7";
            });

            button.on("mousedown", () => {
                button.y += 8;
                bkg.shadow.offsetY = 0;
            });

            button.on("pressup", () => {
                button.y -= 8;
                bkg.shadow.offsetY = 8;
            });

            button.on("click", function(){
                this.close();
            }.bind(this) );

            button.x = -125;
            button.y = 50;

            this.button = button;

            this.addChild( background , img, button );
        }

        p.completeSetup = function()
        {
            var background = new createjs.Shape();
            var width = 500;
            var height = 300;

            background.graphics.beginFill( "#FFF" )
                .drawRoundRect(0,0, width, height, 30);

            background.x = -width/2;
            background.y = -height/2;

            background.shadow = new createjs.Shadow("rgba(0,0,0,.05)", 0, 0, 40 );


            var img = new createjs.Bitmap("img/congrats.png");


            img.x = -93;
            img.y = -45;



            this.addChild( background , img );
        }

	    p.open = function()
	    {
            this.scaleX = this.scaleY = 0;

            container.addChild( this );

            var tween = createjs.Tween.get( this , {override: true } );
            tween.to(
                {
                    scaleX: 1,
                    scaleY: 1
                }, 600, createjs.Ease.elasticOut
            );

            if( this.button )
                this.button.mouseEnabled = true;

	    };

        p.close = function()
        {
            if( this.button )
                this.button.mouseEnabled = false;

            var tween = createjs.Tween.get( this , {override: true } );
            tween.to(
                {
                    scaleX: 0,
                    scaleY: 0
                }, 300, createjs.Ease.backIn
            );
        }

    window.Modal = createjs.promote( Modal, "Container" );
} () );
