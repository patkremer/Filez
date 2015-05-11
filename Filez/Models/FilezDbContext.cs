using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Filez.Models
{
    public class FilezDbContext : DbContext
    {
        public FilezDbContext() : base("FilezDb")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Upload> Uploads { get; set; }

    }
}