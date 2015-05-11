using Filez.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using System.Drawing.Imaging;

namespace Filez.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            
            return View();
        }

        [HttpPost]
        public ActionResult Upload(UploadViewModel viewModel)
        {
            HttpPostedFileBase photo = Request.Files["files[]"];

            var basePath = Server.MapPath("~/App_Data");
            var thumbPath = Server.MapPath("~/App_Data/thumbs");
            var compressedPath = Server.MapPath("~/App_Data/compressed");

            if (photo != null && photo.ContentLength > 0)
            {
                var orginalFileName = Path.GetFileName(photo.FileName);
                viewModel.FileName = orginalFileName;

                var file = Path.Combine(basePath, orginalFileName);
                photo.SaveAs(file);
                var thumbFileName = "";
                var compressedFileName = "";

                using (var bitmap = Image.FromFile(file))
                {
                    var scale = 500.0/bitmap.Width;
                    var height = (int)Math.Ceiling(bitmap.Height*scale);

                    var size = new Size(500, height);

                    using (var resized = (Bitmap)Compositor.ResizeImage(bitmap, size))
                    {
                        thumbFileName = "thumb_" + orginalFileName;
                        SaveJpeg(Path.Combine(thumbPath, thumbFileName), resized);
                    }

                    compressedFileName = "compressed_" + orginalFileName;
                    SaveJpeg(Path.Combine(compressedPath, compressedFileName), bitmap, 80);
                    
                }
                return RedirectToAction("ImageAsAction", new { path = Path.Combine(thumbPath, thumbFileName) });
            }
            return View("Index");
             
        }

        private void SaveJpeg(string path, Image image, long quality = 100)
        {
            
            var qualityParam = new EncoderParameter(Encoder.Quality, quality);
                
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageEncoders();
            var jpegCodec = codecs.FirstOrDefault(codec => codec.FormatID == ImageFormat.Jpeg.Guid);

            var encoderParams = new EncoderParameters(1);
            encoderParams.Param[0] = qualityParam;
            image.Save(path, jpegCodec, encoderParams);

        }
        public ActionResult ImageAsAction(string path)
        {
            return new ImageResult(path);
        }
    }

    public class ImageResult : ActionResult
    {
        private readonly string _path;

        public ImageResult(string path)
        {
            _path = path;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            using (Bitmap bitmap = (Bitmap)Bitmap.FromFile(_path))
            {
                context.HttpContext.Response.ContentType = "image/jpg";
                bitmap.Save(context.HttpContext.Response.OutputStream, ImageFormat.Jpeg);

            }

        }
    }
}
