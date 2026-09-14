====================
Exastro Platform API
====================

.. raw:: html

   <div id="swagger-ui"></div>

   <script>
   $(function(){

     $('h1').remove();
     $('#article').attr('id', 'swaggerBody');

     $api_urls = [
       {url: "https://raw.githubusercontent.com/exastro-suite/exastro-platform/2.9/docs/openapi/build/user_reference.yaml", name: "2.9"}
     ];

     // Begin Swagger UI call region
     const ui = SwaggerUIBundle({
       urls: $api_urls,
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
