using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Filez
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Tells membership provider to use the Baller table too store user profile information
            //var migrator = new DbMigrator(new Configuration());
            //migrator.Update();

            // Clear all registered view engines
            ViewEngines.Engines.Clear();
            // Add back in just the Razor view engine
            ViewEngines.Engines.Add(new RazorViewEngine());
           
            // WebApi formatters
            var formatters = GlobalConfiguration.Configuration.Formatters;
            formatters.Remove(formatters.XmlFormatter); 

            // Set json formatters
            var json = formatters.JsonFormatter;
      
            json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
            json.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            json.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
            // Finally set new settings to global config
            GlobalConfiguration.Configuration.EnsureInitialized();
        }
    }
}
