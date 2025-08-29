==========================================
Exastro ITA Ansible Execution Receiver API
==========================================

.. raw:: html

   <div id="swagger-ui"></div>

   <script>
   $(function(){

     $('h1').remove();
     $('#article').attr('id', 'swaggerBody');

     $api_urls = [
       {url: "https://raw.githubusercontent.com/exastro-suite/exastro-it-automation/2.6/ita_root/ita_api_ansible_execution_receiver/swagger/swagger.yaml", name: "2.6"}
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
