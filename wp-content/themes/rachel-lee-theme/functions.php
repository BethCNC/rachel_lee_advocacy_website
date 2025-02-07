<?php
/**
 * Rachel Lee Patient Advocacy Child Theme Functions
 */

if (!defined('ABSPATH')) exit;

/**
 * Theme Setup
 */
function rachel_lee_theme_setup() {
    // Load child theme text domain
    load_child_theme_textdomain('rachel-lee-theme', get_stylesheet_directory() . '/languages');
}
add_action('after_setup_theme', 'rachel_lee_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function rachel_lee_enqueue_scripts() {
    // Enqueue custom scripts built with webpack
    $assets_path = get_stylesheet_directory_uri() . '/assets/js/';
    
    // Interactive components
    wp_enqueue_script(
        'rachel-lee-interactive',
        $assets_path . 'interactive-components.bundle.js',
        ['jquery'],
        '1.0.0',
        true
    );

    // Accessibility features
    wp_enqueue_script(
        'rachel-lee-accessibility',
        $assets_path . 'accessibility-features.bundle.js',
        ['jquery'],
        '1.0.0',
        true
    );

    // Common components
    wp_enqueue_script(
        'rachel-lee-common',
        $assets_path . 'common-components.bundle.js',
        ['jquery'],
        '1.0.0',
        true
    );

    // Localize script with WordPress data
    wp_localize_script('rachel-lee-interactive', 'rachelLeeData', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('rachel-lee-nonce')
    ]);
}
add_action('wp_enqueue_scripts', 'rachel_lee_enqueue_scripts');

/**
 * Custom Divi Builder Modules
 */
function rachel_lee_load_modules() {
    if (class_exists('ET_Builder_Module')) {
        foreach (glob(get_stylesheet_directory() . '/modules/**/module.php') as $module) {
            require_once $module;
        }
    }
}
add_action('et_builder_ready', 'rachel_lee_load_modules');

/**
 * Include additional functionality
 */
$includes = [
    'includes/custom-post-types.php',
    'includes/shortcodes.php',
    'includes/template-functions.php',
    'includes/ajax-handlers.php'
];

foreach ($includes as $file) {
    $filepath = get_stylesheet_directory() . '/' . $file;
    if (file_exists($filepath)) {
        require_once $filepath;
    }
} 