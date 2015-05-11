using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Web;

namespace Filez
{
    public class Compositor
    {
        public static Image ResizeImage(Image imgToDemo3, Size size)
        {
            var sourceWidth = imgToDemo3.Width;
            var sourceHeight = imgToDemo3.Height;

            float nPercent;

            var nPercentW = (size.Width / (float)sourceWidth);
            var nPercentH = (size.Height / (float)sourceHeight);

            if (nPercentH < nPercentW)
                nPercent = nPercentH;
            else
                nPercent = nPercentW;

            var destWidth = (int)(sourceWidth * nPercent);
            var destHeight = (int)(sourceHeight * nPercent);

            var b = new Bitmap(destWidth, destHeight);
            using (var g = Graphics.FromImage(b))
            {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.DrawImage(imgToDemo3, 0, 0, destWidth, destHeight);
            }

            return b;
        }

        public static Image CropImage(Image img, Rectangle cropArea)
        {
            var bmpImage = new Bitmap(img);
            var bmpCrop = bmpImage.Clone(cropArea, bmpImage.PixelFormat);
            return bmpCrop;
        }
        //public static Image ReduceImageFileSize((Image image, long quality = 50)
        //{
            
            
        //}
        public static Image RotateImage(Image image, float angle, Color bkColor)
        {

            double imgW = (double)image.Width;
            double imgH = (double)image.Height;

            float rotateAtX = (float)imgW / 2;
            float rotateAtY = (float)imgH / 2;

            int W, H, X, Y;


            double degrees = Math.Abs(angle);

            double radians = degrees * Math.PI / 180.0;
            double sin = (float)Math.Abs(Math.Sin(radians));
            double cos = (float)Math.Abs(Math.Cos(radians));

            W = (int)(sin * imgH + cos * imgW);
            H = (int)(sin * imgW + cos * imgH);
            X = (W - image.Width) / 2;
            Y = (H - image.Height) / 2;


            //create a new empty bitmap to hold rotated image
            var bmpRet = new Bitmap(W, H);
            bmpRet.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            //make a graphics object from the empty bitmap
            using (var g = Graphics.FromImage(bmpRet))
            {
                g.Clear(bkColor);

                //Put the rotation point in the "center" of the image
                g.TranslateTransform(rotateAtX + X, rotateAtY + Y);

                //rotate the image
                g.RotateTransform(angle);
                //move the image back
                g.TranslateTransform(-rotateAtX - X, -rotateAtY - Y);

                //draw passed in image onto graphics object
                g.DrawImage(image, new PointF(0 + X, 0 + Y));

            }

            return bmpRet;
        }
    }
}