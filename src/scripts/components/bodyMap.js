// Body Map Component
class BodyMap {
    constructor(containerId) {
        this.container = d3.select(`#${containerId}`);
        this.width = 400;
        this.height = 600;
        this.activeRegion = null;
        this.initialize();
    }

    initialize() {
        this.svg = this.container
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);

        this.defineBodyRegions();
        this.setupInteractions();
    }

    defineBodyRegions() {
        // Define body regions with their associated conditions
        this.regions = [
            {
                id: 'head',
                path: 'M200,50 C240,50 270,80 270,120 C270,160 240,190 200,190 C160,190 130,160 130,120 C130,80 160,50 200,50',
                conditions: [
                    {
                        name: 'Cranial Instability',
                        symptoms: ['Headaches', 'Neck pain', 'Dizziness'],
                        relatedConditions: ['EDS', 'Chiari Malformation']
                    }
                ]
            },
            {
                id: 'spine',
                path: 'M200,190 L200,400',
                conditions: [
                    {
                        name: 'Spinal Instability',
                        symptoms: ['Back pain', 'Nerve compression', 'Muscle weakness'],
                        relatedConditions: ['EDS', 'CCI', 'Tethered Cord']
                    }
                ]
            },
            // Add more regions as needed
        ];

        // Draw regions
        this.regions.forEach(region => {
            this.svg.append('path')
                .attr('id', region.id)
                .attr('d', region.path)
                .attr('class', 'body-region')
                .on('click', () => this.showConditions(region));
        });
    }

    setupInteractions() {
        // Hover effects
        this.svg.selectAll('.body-region')
            .on('mouseover', function() {
                d3.select(this)
                    .classed('hover', true);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .classed('hover', false);
            });
    }

    showConditions(region) {
        // Update active region
        if (this.activeRegion) {
            this.svg.select(`#${this.activeRegion}`)
                .classed('active', false);
        }
        this.activeRegion = region.id;
        this.svg.select(`#${region.id}`)
            .classed('active', true);

        // Update info panel
        const panel = document.getElementById('conditionPanel');
        panel.innerHTML = `
            <h3>${region.id.charAt(0).toUpperCase() + region.id.slice(1)} Region</h3>
            ${region.conditions.map(condition => `
                <div class="condition-detail">
                    <h4>${condition.name}</h4>
                    <h5>Common Symptoms:</h5>
                    <ul>
                        ${condition.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                    </ul>
                    <h5>Related Conditions:</h5>
                    <ul>
                        ${condition.relatedConditions.map(rc => `<li>${rc}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        `;
    }
}

// Export for use in main application
export default BodyMap; 