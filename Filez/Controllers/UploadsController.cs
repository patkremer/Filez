using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Filez.Models;

namespace Filez.Controllers
{
    public class UploadsController : ApiController
    {
        private FilezDbContext db = new FilezDbContext();

        // GET: api/Uploads
        public IQueryable<Upload> GetUploads()
        {
            return db.Uploads;
        }

        // GET: api/Uploads/5
        [ResponseType(typeof(Upload))]
        public IHttpActionResult GetUpload(int id)
        {
            Upload upload = db.Uploads.Find(id);
            if (upload == null)
            {
                return NotFound();
            }

            return Ok(upload);
        }

        // PUT: api/Uploads/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUpload(int id, Upload upload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != upload.Id)
            {
                return BadRequest();
            }

            db.Entry(upload).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UploadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Uploads
        [ResponseType(typeof(Upload))]
        public IHttpActionResult PostUpload(Upload upload)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Uploads.Add(upload);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = upload.Id }, upload);
        }

        // DELETE: api/Uploads/5
        [ResponseType(typeof(Upload))]
        public IHttpActionResult DeleteUpload(int id)
        {
            Upload upload = db.Uploads.Find(id);
            if (upload == null)
            {
                return NotFound();
            }

            db.Uploads.Remove(upload);
            db.SaveChanges();

            return Ok(upload);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UploadExists(int id)
        {
            return db.Uploads.Count(e => e.Id == id) > 0;
        }

        //public async Task<JQueryFileUpload> Get()
        //{
        //    return await HandleRequest();
        //}

        //// POST api/ileHandler/
        //public async Task<JQueryFileUpload> Post()
        //{
        //    return await HandleRequest();
        //}

        //// DELETE api/values/fileName
        //public async Task<JQueryFileUpload> Delete(string fileName)
        //{
        //    return await HandleRequest();
        //}


        //private async Task<JQueryFileUpload> HandleRequest()
        //{
        //    var request = new HttpRequestWrapper(HttpContext.Current.Request);
        //    FileUploadHandler handler = new FileUploadHandler(request, null);       // Get an instance of the handler class
        //    handler.IncomingRequestStarted += handler_IncomingRequestStarted;       // Register event handler for demo purposes

        //    var task = handler.HandleRequestAsync();                                // Call the asyncronous handler method
        //    // Do other stuff here
        //    var jsonResult = (JsonResult)await task;                                // Awaits the result, but does not block the thread
        //    //var jsonResult = (JsonResult)await handler.HandleRequestAsync();      // Both methods above can be combined 

        //    return (JQueryFileUpload)jsonResult.Data;                               // JsonResult.Data is of type object and must be casted 
        //    // to your plugins handler class
        //}


        //// Demo event handler
        //void handler_IncomingRequestStarted(object sender, Eventing.Args.IncomingRequestEventArgs e)
        //{
        //    var values = e.Param.BackloadValues;
        //}
    }
}