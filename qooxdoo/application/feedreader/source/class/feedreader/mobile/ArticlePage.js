/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Tino Butz (tbtz)

************************************************************************ */
/**
 * Mobile page responsible for shoing a single article.
 */
qx.Class.define("feedreader.mobile.ArticlePage", 
{
  extend : qx.ui.mobile.page.Page,


  properties : {
    /**
     * The article which should be shown.
     */
    article : {
      event : "changeArticle",
      init : null,
      nullable : true,
      apply : "_applyArticle"
    }
  },


  events : {
    /**
     * Navigation event for the back button.
     */
    "back" : "qx.event.type.Event"
  },


  members :
  {
    __title : null,
    __article : null,


    // overridden
    _initialize : function() {
      this.base(arguments);

      // create the navigationbar
      var navigationbar = new qx.ui.mobile.navigationbar.NavigationBar();
      var backButton = new qx.ui.mobile.navigationbar.BackButton(this.tr("Back"));
      navigationbar.add(backButton);
      backButton.addListener("tap", function() {
        this.fireEvent("back");
      }, this);
      this.__title = new qx.ui.mobile.navigationbar.Title("Feed");
      navigationbar.add(this.__title, {flex: 1});
      this.add(navigationbar);

      // add a scroller
      var scroller = new qx.ui.mobile.container.Scroll();
      this.add(scroller, {flex: 1});
      
      // add the article embed
      this.__article = new qx.ui.mobile.embed.Html();
      scroller.add(this.__article);
    },


    // property apply
    _applyArticle : function(value, old) {
      if (value != null) {
        this.__title.setValue(value.getTitle());
        var html = feedreader.ArticleBuilder.createHtml(value);
        this.__article.setHtml(
          "<div style='color: white; padding: 10px'>" + html + "</div>"
        );
      }
    }
  }
});