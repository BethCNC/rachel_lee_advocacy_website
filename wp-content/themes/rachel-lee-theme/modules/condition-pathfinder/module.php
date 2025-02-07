<?php
/**
 * Condition Pathfinder Divi Module
 */

class RLEE_Condition_Pathfinder extends ET_Builder_Module {
    public $slug = 'rlee_condition_pathfinder';
    public $vb_support = 'on';

    public function init() {
        $this->name = esc_html__('Condition Pathfinder', 'rachel-lee-theme');
        $this->icon = 'M';
        $this->main_css_element = '%%order_class%%';
    }

    public function get_fields() {
        return [
            'title' => [
                'label' => esc_html__('Title', 'rachel-lee-theme'),
                'type' => 'text',
                'option_category' => 'basic_option',
                'description' => esc_html__('Enter a title for your pathfinder.', 'rachel-lee-theme'),
                'toggle_slug' => 'main_content',
            ],
            'initial_question' => [
                'label' => esc_html__('Initial Question', 'rachel-lee-theme'),
                'type' => 'text',
                'option_category' => 'basic_option',
                'description' => esc_html__('Enter the first question to start the pathfinder.', 'rachel-lee-theme'),
                'toggle_slug' => 'main_content',
            ],
        ];
    }

    public function render($attrs, $content = null, $render_slug) {
        $title = $this->props['title'];
        $initial_question = $this->props['initial_question'];

        // Add our React mounting point
        return sprintf(
            '<div class="rlee-condition-pathfinder" data-title="%1$s" data-initial-question="%2$s">
                <div id="pathfinder-%3$s" class="pathfinder-root"></div>
            </div>',
            esc_attr($title),
            esc_attr($initial_question),
            esc_attr($this->slug)
        );
    }
} 