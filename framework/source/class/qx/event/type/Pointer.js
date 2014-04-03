/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2014 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * Pointer event object.
 *
 * the interface of this class is based on the pointer event interface:
 * http://www.w3.org/TR/pointerevents/
 */
qx.Class.define("qx.event.type.Pointer",
{
  extend : qx.event.type.Mouse,


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    _cloneNativeEvent : function(nativeEvent, clone)
    {
      var clone = this.base(arguments, nativeEvent, clone);

      clone.pointerId = nativeEvent.pointerId;
      clone.width = nativeEvent.width;
      clone.height = nativeEvent.height;
      clone.pressure = nativeEvent.pressure;
      clone.tiltX = nativeEvent.tiltX;
      clone.tiltY = nativeEvent.tiltY;
      clone.pointerType = nativeEvent.pointerType;
      clone.isPrimary = nativeEvent.isPrimary;

      return clone;
    },


    /**
     * Returns a unique identified for the pointer. This id is
     * unique for all active pointers.
     *
     * @return {Number} The unique id.
     */
    getPointerId : function() {
      return this._native.pointerId || 0;
    },



    /**
     * Returns the contact geometry in it's width.
     *
     * @return {Number} The number of pixels (width) of the contact geometry.
     */
    getWidth : function() {
      return this._native.width || 0;
    },


    /**
     * Returns the contact geometry in it's height.
     *
     * @return {Number} The number of pixels (height) of the contact geometry.
     */
    getHeight : function() {
      return this._native.height || 0;
    },


    /**
     * Returns the pressure of the pointer in a rage from 0 to 1.
     *
     * @return {Number} <code>1</code> for full pressure. The default is 0.
     */
    getPressure : function() {
      return this._native.pressure || 0;
    },


    /**
     * Returns the plane angle in degrees between the Y-Z plane and the
     * plane containing e.g. the stylus and the Y axis.
     *
     * @return {Number} A value between -90 and 90. The default is 0.
     */
    getTiltX : function() {
      return this._native.tiltX || 0;
    },


    /**
     * Returns the plane angle in degrees between the X-Z plane and the
     * plane containing e.g. the stylus and the X axis.
     *
     * @return {Number} A value between -90 and 90. The default is 0.
     */
    getTiltY : function() {
      return this._native.tiltY || 0;
    },


    // overridden
    getOriginalTarget : function() {
      if (this._native && this._native._original) {
        var orig = this._native._original;
        // touch events have a wrong target compared to mouse events
        if (orig.type.indexOf("touch") == 0) {
          if (orig.changedTouches[0]) {
            return document.elementFromPoint(orig.changedTouches[0].clientX, orig.changedTouches[0].clientY);
          }
        }
        return qx.bom.Event.getTarget(orig);
      }
      return this.base(arguments);
    },


    /**
     * Returns the device type which the event triggered. This can be one
     * of the following strings: <code>mouse</code>, <code>pen</code>
     * or <code>touch</code>.
     *
     * @return {String} The type of the pointer.
     */
    getPointerType : function() {
      if (typeof this._native.pointerType == "string") {
        return this._native.pointerType;
      }

      if (typeof this._native.pointerType == "number") {
        if (this._native.pointerType == this._native.MSPOINTER_TYPE_MOUSE) {
          return "mouse";
        }
        if (this._native.pointerType == this._native.MSPOINTER_TYPE_PEN) {
          return "pen";
        }
        if (this._native.pointerType == this._native.MSPOINTER_TYPE_TOUCH) {
          return "touch";
        }
      }

      return "";
    },


    /**
     * Returns whether the pointer is the primary pointer.
     *
     * @return {Boolean} <code>true</code>, if it's the primary pointer.
     */
    isPrimary : function() {
      return !!this._native.isPrimary;
    }
  }
});
