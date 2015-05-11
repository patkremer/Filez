using System.Web;
using System.Web.Optimization;

namespace Filez
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Public/js/vendor/jquery/jquery-1.10.2.js",
                "~/Public/js/vendor/handlebars-v1.3.0.js"));
            //"~/Scripts/jquery-ui-1.10.4.js"
            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Public/js/vendor/modernizr-2.6.2.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Public/js/vendor/bootstrap.js",
                "~/Public/js/vendor/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-fileupload").Include(
                "~/Public/js/vendor/jquery-fileupload/jquery.ui.widget.js",
                "~/Public/js/vendor/canvas-to-blob.js",
                "~/Public/js/vendor/load-image.js",
                "~/Public/js/vendor/load-image-ios.js",
                "~/Public/js/vendor/load-image-meta.js",
                "~/Public/js/vendor/load-image-exif.js",
                "~/Public/js/vendor/load-image-orientation",
                "~/Public/js/vendor/load-image-exif-map.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.iframe-transport.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.fileupload.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.fileupload-process.js",
               // "~/Public/js/vendor/jquery-fileupload/jquery.fileupload-ui.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.fileupload-image.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.fileupload-video.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.fileupload-audio.js",
                "~/Public/js/vendor/jquery-fileupload/jquery.fileupload-validate.js"
                 ));
            
            bundles.Add(new ScriptBundle("~/bundles/blueimp-gallery").Include(
                "~/Public/js/vendor/blueimp-gallery/blueimp-gallery.js",
                 "~/Public/js/vendor/blueimp-gallery/jquery.blueimp-gallery.js"));
                //"~/Public/js/vendor/blueimp-gallery/blueimp-gallery-fullscreen.js",
                //"~/Public/js/vendor/blueimp-gallery/blueimp-gallery-indicator.js",
                //"~/Public/js/vendor/blueimp-gallery/blueimp-gallery-video.js"

            //bundles.Add(new ScriptBundle("~/bundles/image-handler").Include(
            //    "~/Public/js/vendor/canvas-to-blob.js",
            //    "~/Public/js/vendor/load-image.js",
            //    "~/Public/js/vendor/load-image-ios.js",
            //    "~/Public/js/vendor/load-image-meta.js",
            //    "~/Public/js/vendor/load-image-exif.js",
            //    "~/Public/js/vendor/load-image-orientation",
            //    "~/Public/js/vendor/load-image-exif-map.js"));



            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                //"~/Public/js/app.js",
               // "~/Public/js/JSFramework.js",
                "~/Public/js/fileManager.js"));

            bundles.Add(new StyleBundle("~/Public/css").Include(
                "~/Public/css/bootstrap.css",
                "~/Public/css/blueimp-gallery.css",
                "~/Public/css/blueimp-gallery-indicator.css",
                "~/Public/css/blueimp-gallery-video.css",
                "~/Public/css/jquery.fileupload.css",
                "~/Public/css/jquery.fileupload-ui.css",
                "~/Public/css/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload.js" />
            ///Public/js/vendor/jquery-fileupload/jquery.iframe-transport.js" /
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload-process.js"
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload-ui.js" />
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload-image.js" /
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload-video.js" /
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload-audio.js" /
            ///Public/js/vendor/jquery-fileupload/jquery.fileupload-validate.js
        }
    }
}