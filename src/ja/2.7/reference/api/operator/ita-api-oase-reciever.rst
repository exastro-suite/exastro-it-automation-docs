==============================
Exastro ITA OASE Receiver API
==============================

.. raw:: html

   <div id="swagger-ui"></div>

   <script>
   $(function(){

     $('h1').remove();
     $('#article').attr('id', 'swaggerBody');

     $api_urls = [
       {url: "https://raw.githubusercontent.com/exastro-suite/exastro-it-automation/2.7/ita_root/ita_api_oase_receiver/openapi.yaml", name: "2.7"}
     ]

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
       layout: "StandaloneLayout",
     });
     // End Swagger UI call region

     window.ui = ui;
   });
   </script>
