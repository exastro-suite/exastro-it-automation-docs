===============================
Exastro IT Automation Admin API
===============================

.. raw:: html

   <div id="swagger-ui"></div>

   <link href="/_static/swagger/swagger-ui.css" rel="stylesheet">
   <script src="/_static/jquery-1.11.3.js" charset="UTF-8"></script>
   <script src="/_static/swagger/swagger-ui-bundle.js" charset="UTF-8"></script>
   <script src="/_static/swagger/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
   <script>

   $(function(){

     $('h1').remove();
     $('#article').attr('id', 'swaggerBody');

     $dir = location.href.split("/");
     $ver = $dir[3].replace("v","");

     $api_url = "";
     $api_url += "https://raw.githubusercontent.com/exastro-suite/exastro-it-automation"
     $api_url += "/" + $ver;
     $api_url += "/ita_root/ita_api_admin/openapi.yaml";

     // Begin Swagger UI call region
     const ui = SwaggerUIBundle({
       url: $api_url,
       dom_id: '#swagger-ui',
       deepLinking: true,
       presets: [
         SwaggerUIBundle.presets.apis,
         SwaggerUIStandalonePreset.slice(1)
       ],
       plugins: [
         SwaggerUIBundle.plugins.DownloadUrl
       ],
       layout: "StandaloneLayout",
       supportedSubmitMethods: []
     });
     // End Swagger UI call region

     window.ui = ui;
   });
   </script>