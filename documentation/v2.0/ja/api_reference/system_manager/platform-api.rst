====================
Exastro Platform API
====================

.. raw:: html

   <div id="swagger-ui"></div>

   <link href="../../../../_static/swagger/swagger-ui.css" rel="stylesheet">
   <script src="../../../../_static/jquery-3.6.3.min.js" charset="UTF-8"></script>
   <script src="../../../../_static/swagger/swagger-ui-bundle.js" charset="UTF-8"></script>
   <script src="../../../../_static/swagger/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
   <script>

   $(function(){

     $('h1').remove();
     $('#article').attr('id', 'swaggerBody');

     $api_url = "https://raw.githubusercontent.com/exastro-suite/exastro-platform/1.2/docs/openapi/build/system_manager_reference.yaml";

     // Begin Swagger UI call region
     const ui = SwaggerUIBundle({
       url: $api_url,
       dom_id: '#swagger-ui',
       deepLinking: true,
       presets: [
         SwaggerUIBundle.presets.apis,
         SwaggerUIStandalonePreset
       ],
       plugins: [
         SwaggerUIBundle.plugins.DownloadUrl
       ],
       defaultModelsExpandDepth: -1,
       layout: "StandaloneLayout",
     });
     // End Swagger UI call region

     window.ui = ui;
   });
   </script>