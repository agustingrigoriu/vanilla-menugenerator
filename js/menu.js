(function(MenuGenerator, undefined) {

  var createMenuItem = function(item) {
    var hasSubmenu = item.submenu.length > 0;

    //Creating LI ELEMENT
    var li = document.createElement("li");
    li.className += " noselect";

    //Creating ANCHOR TAG ELEMENT
    var label = document.createElement("label");
    //label.href = hasSubmenu ? "#" : item.url;
    label.title = item.title;

    //Creating ICON ELEMENT
    var icon = document.createElement("i");
    icon.className = item.class;

    //Creating SPAN ELEMENT
    var span = document.createElement("span");
    span.className = "menu-item-parent";
    span.innerHTML = item.title;

    //Appending childs
    label.appendChild(icon);
    label.appendChild(span);
    li.appendChild(label);

    // If we have submenu, we create an ul element and call again to genMenu
    if (!hasSubmenu) {
      li.url = item.url;
      li.id = item.title;
      li.onclick = function(e) {
        e.stopPropagation();
        router.navigate(this.url);
      };
    } else {
      //Creating B ELEMENT
      //li.className = "top-menu-invisible";
      li.onclick = function(e) {
        e.stopPropagation();
        var children = this.childNodes;
        for(i = 0; i < children.length; i++) {
          if(children[i].tagName === "UL") {
            var ul = children[i];
            if(ul.style.display === "none")
              ul.style.display = "block";
            else
              ul.style.display = "none";
            break;
          };
        };
      };
      var b = document.createElement("b");
      b.className = "collapse-sign";

      //Creating EM ELEMENT
      var em = document.createElement("em");
      em.className = "fa fa-plus-square-o";

      //Appending childs
      b.appendChild(em);
      label.appendChild(b);

      //Creating UL ELEMENT
      var ul = document.createElement("ul");
      ul.style.cssText = "display: none;";

      //Populating UL
      genMenu(ul, item.submenu);

      //Assigning UL ELEMENT
      li.appendChild(ul);
    }

    return li;
  };

  var genMenu = function(parentEl, data) {
    data.forEach(item => {
      var li = createMenuItem(item);
      parentEl.appendChild(li);
    });
  };

  var setSwipe = function(element) {
    var hammer = new Hammer.Manager(element, {
      touchAction: 'pan-y'
    });

    hammer.add(new Hammer.Swipe({
      direction: Hammer.DIRECTION_ALL,
      threshold: 1,
      velocity:0.1
    }));

    hammer.on('swipeleft', function() {
      Hamburger.hideMenu();
    });

  };

  MenuGenerator.init = function() {
    var menuEl = document.getElementById("menu");
    setSwipe(menuEl);
    fetch("/cgi-bin/imris.bf/usermenu", {
        credentials: "same-origin"
      })
      .then(function(response) {
        if(response.ok) {
          response.json()
          .then(function(myJson) {
            genMenu(menuEl, myJson);
          });
        };
      });
  };
})((window.MenuGenerator = window.MenuGenerator || {}));
