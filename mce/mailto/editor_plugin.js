(function()
 {
  // Load plugin specific language pack
  tinymce.PluginManager.requireLangPack('emailbutton');
  tinymce.create('tinymce.plugins.EmailButton',{
    init : function(ed, url){
      ed.addButton('emailbutton', {
        title : 'emailbutton.emailbutton_desc',
        cmd : 'mceEmailButton',
        image : url + '/images/email.jpg'
      });
      
      //onclick : function() {
      ed.addCommand('mceEmailButton', function(){
        var selected_text = ed.selection.getContent();
        var prompt_text;
        var e1 = 'Please select the text first';
        var e2 = 'Email address you entered does not appear to be valid';
        var p1 = 'Enter email here';
        var regx1 = /<a.*mailto.*?>/g;
        var regx2 = /.*\"mailto:(.*[a-zA-Z0-9._+-]?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})".*/g;
        var regx3 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        var regx4 = /<(?!\/)[a-z].*?>/g;
        var regx5 = /(<.*?>)/g;
        var regx6 = /(.*?\"mailto:)(.*[a-zA-Z0-9._+-]?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})(".*)/g;
        
        
        if (selected_text === ""){
          alert (e1);
          return false;
        }
        
        if(regx1.test(selected_text)){
          selected_text_email = selected_text.replace(regx2,"$1");
          prompt_text = prompt(p1, selected_text_email);
          
          if (prompt_text === null){
            return false;
          }
          
          if (regx3.test(prompt_text)){
            ed.selection.setContent(selected_text.replace(regx6,"$1"+prompt_text+"$3"));
          } else {
            alert(e2);
            return false;
          }
        } else {
          
          selected_text_tags_before_Array = selected_text.match(regx4,"");
          
          if (selected_text_tags_before_Array !== null){
            selected_text_tags_before = selected_text_tags_before_Array.join('');
          } else {
            selected_text_tags_before = "";
          }
          
          selected_text_tags_after_Array = selected_text.match(regx4);
          
          if (selected_text_tags_after_Array !== null){
            selected_text_tags_after = selected_text_tags_after_Array.join('');
          } else {
            selected_text_tags_after = "";
          }
          
          selected_text_without_tags = selected_text.replace(regx5,"");
          
          prompt_text = prompt(p1, selected_text_without_tags);
          
          if (prompt_text === null){
            return false;
          }
          
          if (regx3.test(prompt_text)){
            ed.selection.setContent(selected_text_tags_before + "<a href='mailto:" + prompt_text + "'>"+selected_text_without_tags+"</a>"+selected_text_tags_after);
          } else {
            alert(e2);
            return false;
          }
        }
      });
    },
    
    //createControl : function(n, cm) {return null;},
    /**
     * Returns information about the plugin as a name/value array.
     * The current keys are longname, author, authorurl, infourl and version.
     *
     * @return {Object} Name/value array containing information about the plugin.
     */
    
    getInfo : function() {
      return {
        longname :  'EmailButton',
        author :    'Nookeen (A. Pasternak)',
        authorurl : 'http://nookeen.com',
        version :   "1.0"
      };
    }
  });
  tinymce.PluginManager.add('emailbutton', tinymce.plugins.EmailButton);
})();