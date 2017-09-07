<?php
/*
Plugin Name: TinyMCE Custom Email Button
Description: Adds a button to the visual editor which converts the selected text into a custom mailto link.
Version: 1.0
Author: Nookeen (A. Pasternak)
Author URI: http://nookeen.com

TinyMCE Email Button
Copyright (C) 2012 A. Pasternak, Nookeen Media

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see http://www.gnu.org/licenses/>./copyleft/gpl.html
*/


function tinymce_emailbutton_addbuttons()
{
  // Don't bother doing this stuff if the current user lacks permissions
  if ( current_user_can('edit_posts') && current_user_can('edit_pages') )
  {
    if ( get_user_option('rich_editing') == 'true')
    {
      add_filter("mce_external_plugins", "add_tinymce_emailbutton_plugin");
      add_filter('mce_buttons', 'register_tinymce_emailbutton_buttons');
    }
  }
}

function register_tinymce_emailbutton_buttons($buttons)
{
  array_push($buttons, "separator", "emailbutton");
  return $buttons;
}

// Load the TinyMCE plugin : editor_plugin.js (wp2.5)
function add_tinymce_emailbutton_plugin($plugin_array)
{
  $plugin_name = preg_replace('/\.php/','',basename(__FILE__));
  $plugin_array['emailbutton'] = WP_PLUGIN_URL .'/'.$plugin_name.'/mce/mailto/editor_plugin.js';
  return $plugin_array;
}

add_action('init', 'tinymce_emailbutton_addbuttons');