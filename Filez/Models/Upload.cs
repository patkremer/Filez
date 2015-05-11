using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Filez.Models
{
    public class Upload
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string LargeImageFileName { get; set; }
        public string ThumbnailFileName { get; set; }
        public bool IsImage { get; set; }
        public string Extension { get; set; }
        public string ContentType { get; set; }
        public string Path { get; set; }
        public string Url { get; set; }
        public string LargeImageUrl{ get; set; }
        public string ThumbnailUrl { get; set; }
        public DateTime CreatedDate { get; set; }
        public double Size { get; set; }

        public HttpPostedFileBase UploadedFile { get; set; }
    }
}