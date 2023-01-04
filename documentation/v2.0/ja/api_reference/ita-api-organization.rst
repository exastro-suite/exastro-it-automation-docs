======================================
Exastro IT Automation Organization API
======================================

.. raw:: html

   <div id="swagger-ui"></div>

   <link href="../../../_static/swagger/swagger-ui.css" rel="stylesheet">
   <script src="../../../_static/jquery-1.11.3.js" charset="UTF-8"></script>
   <script src="../../../_static/swagger/swagger-ui-bundle.js" charset="UTF-8"></script>
   <script src="../../../_static/swagger/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
   <script>

   $(function(){

     $('h1').remove();
     $('#article').attr('id', 'swaggerBody');

     $api_url = "https://raw.githubusercontent.com/exastro-suite/exastro-it-automation/2.0/ita_root/ita_api_organization/openapi.yaml";

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