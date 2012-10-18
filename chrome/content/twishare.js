/*var linkTargetFinder = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return {
		init : function () {
                    alert("AS");
		},
			
		run : function () {
		    alert("run da");
		}
	};
}();
window.addEventListener("load", linkTargetFinder.init, false);*/
var myExtension = {
    init: function() {
        // The event can be DOMContentLoaded, pageshow, pagehide, load or unload.
        if(gBrowser) gBrowser.addEventListener("DOMContentLoaded", this.onPageLoad, false);
    },
    onPageLoad: function(aEvent) {
        var doc = aEvent.originalTarget; // doc is document that triggered the event
        var win = doc.defaultView; // win is the window for the doc
        // test desired conditions and do something
        // if (doc.nodeName == "#document") return; // only documents
        // if (win != win.top) return; //only top window.
        // if (win.frameElement) return; // skip iframes/frames
//        alert("page is loaded \n" +doc.location.href);
            function toFb(this1)
            {
                var Ele2 = this1.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('js-tweet-text')[0];
                Ele2 = Ele2.innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
                gBrowser.addTab("http://vivekhas3.herokuapp.com/twishare/?txt=" + Ele2);

            }
            if (doc.location.hostname=="twitter.com")
            {
                var HtmlText='<li class="action-reply-container">'+
                             '<a title="Share To Facebook" href="#" class="with-icn tofb1">'+
                             '<i class="service-sm-facebook"></i>'+
                             '<b><span title="Share To Facebook" >Facebook</span></b>'+
                             '</a></li>';
                var Ele=doc.getElementsByClassName('tweet-actions js-actions');
                for(i=0;i<Ele.length;i++)
                {
                    
                    Ele[i].innerHTML+=HtmlText;
                }
                var Ele1=doc.getElementsByClassName('tofb1');
                for(i=0;i<Ele1.length;i++)
                {
                    Ele1[i].addEventListener("click", function()
                    {
                        toFb(this);
                    });
                }
            }
            
    }
}
window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init(); 
},false);
