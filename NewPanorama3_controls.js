PanoramaStudioViewerParams = {
"panoramaStudioViewer": {
"actions": [
        {
            "func": function(){ if (!this.viewer.fullEquirectangular()) return; this.viewer.panTo(this.viewer.getView().pan,0,100,1.0,0,'easeInOutQuad',true); this.tween({'time': 1.0, 'lp': 0.0, 'transition': 'easeInOutQuad', 'onInit' : function(a,dstParams){ a.lp=a.viewer.fisheyeDistortion(); }, 'onUpdate': function(a){ a.viewer.setFisheyeDistortion(a.lp);}}); },
            "id": "leaveLittlePlanet"
        },
        {
            "func": function(){ if (!this.viewer.fullEquirectangular()) return; this.viewer.panTo(this.viewer.getView().pan+90,90,150,1.0,0,'easeInOutQuad',true); this.tween({'time': 1.0, 'lp': 1.0, 'transition': 'easeInOutQuad', 'onInit' : function(a,dstParams){ a.lp=a.viewer.fisheyeDistortion(); }, 'onUpdate': function(a){ a.viewer.setFisheyeDistortion(a.lp);}}); },
            "id": "enterLittlePlanet"
        },
        {
            "func": function(a){ var id = this.viewer.currentMBId; if (!!id&&(a.id!=id)){this.viewer.action('hideMessage');} if (a.id!=id){ var s=this.viewer.get('globalData'); if (s&&s.messageBoxStyle){ a.style = s.messageBoxStyle; }this.viewer.currentMBId=null; if (!this.viewer.isVRModeEnabled()){ this.viewer.add('textbox',a); this.viewer.currentMBId=a.id; } } },
            "id": "showMessage"
        },
        {
            "func": function(){ if (this.viewer.currentMBId) this.viewer.remove(this.viewer.currentMBId); this.viewer.currentMBId=null; },
            "id": "hideMessage"
        },
        {
            "func": function(a){ var id = this.viewer.currentMBId; if (a.id!=id){ this.viewer.action('showMessage',a); } else { this.viewer.action('hideMessage'); } },
            "id": "toggleMessage"
        }
    ],
"button": [
        {
            "align": "lefttop",
            "height": 24,
            "id": "closeButton",
            "onclick": function(){ window.open('https://lesbobinesdupaysage.wixstudio.io/my-site'); },
            "skin": "shadow(4,0,0,rgba(0,0,0,1));shadow(3,0,0,rgba(0,0,0,1));comp(1.0);copy(defaultSkin,0,512,64,64,0,0,24,24)",
            "style": "border-radius: 12px;",
            "styleactive": "border-radius: 12px; background-color:rgba(255, 255, 255, 0.25); box-shadow: 0px 0px 9px 8px rgba(255, 255, 255, 0.25);",
            "stylehover": "border-radius: 12px; background-color:rgba(255, 255, 255, 0.15); box-shadow: 0px 0px 9px 8px rgba(255, 255, 255, 0.15);",
            "width": 24,
            "xoff": 8,
            "yoff": 8
        }
    ],
"contextmenu": {
        "id": "menu",
        "items": [
            {
                "id": "fullscreenItem",
                "onclick": function(){ this.viewer.toggleFullscreen(); },
                "oninit": function(){ this.caption = this.viewer.tr('Fullscreen'); if (!this.viewer.fullscreenSupported()) this.visible = false;  } 
            },
            {
                "caption": "-"
            },
            {
                "id": "normalView",
                "onclick": function(){  if (this.viewer.fisheyeDistortion()!=0.0){ this.viewer.action('leaveLittlePlanet'); } },
                "oninit": function(){  this.caption = this.viewer.tr('Normal View'); }
            },
            {
                "id": "littlePlanetView",
                "onclick": function(){ if (this.viewer.fisheyeDistortion()!=1.0){ this.viewer.action('enterLittlePlanet'); } },
                "oninit": function(){  this.caption = this.viewer.tr('LittlePlanet View'); }
            },
            {
                "caption": "-"
            },
            {
                "onclick": function(){ window.open('https://lesbobinesdupaysage.wixstudio.io/my-site/','_blank'); },
                "oninit": function(){  this.caption = this.viewer.tr('revenir a laccueil...'); }
            }
        ],
        "onshow": function(){ var view1 = this.getItem('normalView'); if (view1){ view1.visible = (this.viewer.webglAvailable && this.viewer.fullEquirectangular()) ? true : false; } var view2 = this.getItem('littlePlanetView'); if (view2){ view2.visible = (this.viewer.webglAvailable && this.viewer.fullEquirectangular())?true:false; }  this.update(); },
        "style": "background-color: rgba(255,255,255,0.8); box-shadow: 4px 4px 4px rgba(0,0,0,0.5); border-radius: 3px;"
    },
"events": {
        "id": "mainEvents",
        "onexit": function(){ this.viewer.action('hideMessage'); },
        "ongyroscopeavailable": function(available){ this.viewer.gyroAvailable = available; var o = this.get('gyrobutton'); if(!!o){ o.setVisible(available&&this.viewer.panoType()==0); } } ,
        "ongyroscopetoggle": function(enabled){ this.viewer.action('updateGyroButton'); },
        "oninit": function(){ var g = this.viewer.gallery(); this.viewer.hasGallery = ((!!g) && g.length>1);  },
        "onplay": function(){ var o = this.get('playbutton'); if (!!o){ o.sbackup = o.skin; o.shbackup = o.skinhover; o.sabackup = o.skinactive; o.skin = 'shadow(3,0,0,rgba(0,0,0,1));copy(defaultSkin,128,0,64,64,0,0,28,28)'; o.skinhover = 'shadow(3,0,0,rgba(0,0,0,1));copy(defaultSkin,128,0,64,64,0,0,28,28)'; o.skinactive = 'shadow(3,0,0,rgba(0,0,0,1));copy(defaultSkin,128,0,64,64,0,0,28,28)'; o.updateSkins(); } } ,
        "onresize": function(){ this.viewer.action('resizeMap');  },
        "onscenechanged": function(){},
        "onstartaudio": function(senderId){ if (senderId=='gAudio'||senderId=='lAudio'){var o = this.get('audiobutton'); if (!!o){ o.skin = o.playskin; o.skinhover = o.playskinhover; o.skinactive = o.playskinactive; o.updateSkins(); }} } ,
        "onstop": function(){ var o = this.get('playbutton'); if (!!o){ o.skin = o.sbackup; o.skinhover = o.shbackup; o.skinactive = o.sabackup; o.updateSkins(); } } ,
        "onstopaudio": function(senderId){ if (senderId=='gAudio'||senderId=='lAudio'){var o = this.get('audiobutton'); if (!!o){ o.skin = o.pauseskin; o.skinhover = o.pauseskinhover; o.skinactive = o.pauseskinactive; o.updateSkins(); }} } ,
        "onuseswebgl": function(available){ this.viewer.webglAvailable = available; if (available){ var vr = this.get('vrButton'); vr&&vr.setVisible(true); } } 
    },
"settings": {
        "safeareamargin": "-8 -8 -8 -8"
    },
"translate": {
        "de": {
            "About PanoramaStudio...": "&Uuml;ber PanoramaStudio...",
            "Fullscreen": "Vollbild",
            "LittlePlanet View": "LittlePlanet-Ansicht",
            "Normal View": "Normale Ansicht"
        }
    }
}
}
