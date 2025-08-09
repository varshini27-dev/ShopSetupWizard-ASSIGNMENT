$(document).ready(function() {
    // Initialize wizard state
    let currentStep = 1;
    let wizardData = {
        theme: 'bags',
        productType: '',
        category: '',
        subcategory: '',
        productName: '',
        productDescription: '',
        skuCode: '',
        hasSku: true,
        hasHsn: false,
        priceInclusiveGst: true,
        netPrice: '',
        listPrice: '',
        discountPercentage: '',
        gstRate: '',
        shippingCharges: '',
        stockLevel: ''
    };

    // Initialize first step
    showStep(1);
    
    // Progress bar click handlers
    $('.progress-step').on('click', function() {
        const targetStep = parseInt($(this).data('step'));
        if (targetStep <= currentStep || validateCurrentStep()) {
            goToStep(targetStep);
        }
    });

    // Navigation button handlers
    $('.btn-next').on('click', function() {
        const nextStep = parseInt($(this).data('next'));
        if (validateCurrentStep()) {
            if (nextStep) {
                goToStep(nextStep);
            } else {
                // Final step completion
                handleWizardCompletion();
            }
        }
    });

    $('.btn-back').on('click', function() {
        const prevStep = parseInt($(this).data('prev'));
        if (prevStep) {
            goToStep(prevStep);
        }
    });

    // Theme selection handlers
    $('.theme-card').on('click', function() {
        const theme = $(this).data('theme');
        selectTheme(theme);
    });

    $('.btn-theme-apply').on('click', function(e) {
        e.stopPropagation();
        const theme = $(this).closest('.theme-card').data('theme');
        selectTheme(theme);
    });

    // Form input handlers
    $('#product-type').on('input', function() {
        wizardData.productType = $(this).val();
        updateFlowDiagram();
    });

    $('#category').on('input', function() {
        wizardData.category = $(this).val();
        updateFlowDiagram();
    });

    $('#subcategory').on('input', function() {
        wizardData.subcategory = $(this).val();
        updateFlowDiagram();
    });

    // Product form handlers
    $('#product-name').on('input', function() {
        wizardData.productName = $(this).val();
        updateProductPreview();
    });

    $('#product-description').on('input', function() {
        wizardData.productDescription = $(this).val();
        updateProductPreview();
        updateCharCount();
    });

    $('#sku-code').on('input', function() {
        wizardData.skuCode = $(this).val();
    });

    $('#has-sku').on('change', function() {
        wizardData.hasSku = $(this).prop('checked');
        toggleSkuInput();
    });

    $('#has-hsn').on('change', function() {
        wizardData.hasHsn = $(this).prop('checked');
    });

    $('#price-inclusive-gst').on('change', function() {
        wizardData.priceInclusiveGst = $(this).prop('checked');
    });

    // Pricing field handlers
    $('#net-price, #list-price').on('input', function() {
        const field = $(this).attr('id').replace('-', '');
        wizardData[field] = $(this).val();
        updateProductPreview();
        calculateDiscount();
    });

    $('#discount-percentage').on('input', function() {
        wizardData.discountPercentage = $(this).val();
    });

    $('#gst-rate').on('input', function() {
        wizardData.gstRate = $(this).val();
    });

    $('#shipping-charges').on('input', function() {
        wizardData.shippingCharges = $(this).val();
    });

    $('#stock-level').on('input', function() {
        wizardData.stockLevel = $(this).val();
    });

    // Image upload handler
    $('.image-upload-area').on('click', function() {
        // Simulate file upload dialog
        showToast('Image upload functionality would be implemented with file input', 'info');
    });

    // Toolbar icon handlers
    $('.toolbar-icons i').on('click', function() {
        const action = $(this).attr('class').split(' ')[1].split('-')[1];
        showToast(`${action.charAt(0).toUpperCase() + action.slice(1)} formatting applied`, 'info');
    });

    // Functions
    function goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 3) return;
        
        // Hide current step
        $('.step-content.active').removeClass('active').fadeOut(300);
        $('.progress-step.active').removeClass('active');
        
        // Update progress
        currentStep = stepNumber;
        
        // Show new step
        setTimeout(() => {
            $(`#step-${stepNumber}`).addClass('active').fadeIn(300);
            $(`.progress-step[data-step="${stepNumber}"]`).addClass('active');
            
            // Mark previous steps as completed
            for (let i = 1; i < stepNumber; i++) {
                $(`.progress-step[data-step="${i}"]`).addClass('completed');
            }
            
            // Remove completed class from future steps
            for (let i = stepNumber + 1; i <= 3; i++) {
                $(`.progress-step[data-step="${i}"]`).removeClass('completed');
            }
        }, 300);
    }

    function showStep(stepNumber) {
        currentStep = stepNumber;
        $('.step-content').removeClass('active');
        $('.progress-step').removeClass('active completed');
        
        $(`#step-${stepNumber}`).addClass('active');
        $(`.progress-step[data-step="${stepNumber}"]`).addClass('active');
    }

    function validateCurrentStep() {
        switch (currentStep) {
            case 1:
                if (!wizardData.theme) {
                    showToast('Please select a theme', 'error');
                    return false;
                }
                break;
            case 2:
                if (!wizardData.productType.trim()) {
                    showToast('Please enter a product type', 'error');
                    $('#product-type').focus();
                    return false;
                }
                break;
            case 3:
                if (!wizardData.productName.trim()) {
                    showToast('Please enter a product name', 'error');
                    $('#product-name').focus();
                    return false;
                }
                if (!wizardData.productDescription.trim()) {
                    showToast('Please enter a product description', 'error');
                    $('#product-description').focus();
                    return false;
                }
                break;
        }
        return true;
    }

    function selectTheme(theme) {
        wizardData.theme = theme;
        
        // Update UI
        $('.theme-card').removeClass('selected');
        $('.btn-theme-select').removeClass('selected');
        $('.btn-theme-apply').text('Apply');
        
        const selectedCard = $(`.theme-card[data-theme="${theme}"]`);
        selectedCard.addClass('selected');
        selectedCard.find('.btn-theme-select').addClass('selected');
        selectedCard.find('.btn-theme-apply').text('Selected');
        
        showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme selected`, 'success');
    }

    function updateFlowDiagram() {
        const productTypeBox = $('.flow-box.primary');
        const categoryBox = $('.flow-box.secondary').first();
        const subcategoryBox = $('.flow-box.secondary').last();
        
        productTypeBox.text(wizardData.productType || 'Product type');
        categoryBox.text(wizardData.category || 'Category');
        subcategoryBox.text(wizardData.subcategory || 'Sub-Category');
    }

    function updateProductPreview() {
        const titlePreview = $('.product-title-preview');
        const descriptionPreview = $('.product-description-preview p');
        const originalPrice = $('.original-price');
        const discountedPrice = $('.discounted-price');
        
        titlePreview.text(wizardData.productName || 'Product title');
        descriptionPreview.text(wizardData.productDescription || 'Esse minim eiusmod amet et incididunt magna consectetur laborum. Ipsum est ullam do exercitation nostrud nostrud ex. Consectetur Lorem nostrud sint adipiscing amet ut cupidatat Lorem adipiscing veniam officia duis exercaetur Lorem labore. Non eu non');
        
        if (wizardData.listPrice) {
            originalPrice.text(`R$ ${wizardData.listPrice}`);
        }
        
        if (wizardData.netPrice) {
            discountedPrice.text(`R$ ${wizardData.netPrice}`);
        }
    }

    function updateCharCount() {
        const description = $('#product-description').val();
        $('.char-count').text(description.length);
    }

    function calculateDiscount() {
        const listPrice = parseFloat(wizardData.listPrice) || 0;
        const netPrice = parseFloat(wizardData.netPrice) || 0;
        
        if (listPrice > 0 && netPrice > 0) {
            const discount = Math.round(((listPrice - netPrice) / listPrice) * 100);
            $('#discount-percentage').val(discount);
            wizardData.discountPercentage = discount.toString();
        }
    }

    function toggleSkuInput() {
        const skuInput = $('#sku-code');
        if (wizardData.hasSku) {
            skuInput.prop('disabled', false).removeClass('disabled');
        } else {
            skuInput.prop('disabled', true).addClass('disabled');
        }
    }

    function handleWizardCompletion() {
        showToast('Shop setup completed successfully!', 'success');
        console.log('Wizard Data:', wizardData);
        
        // Here you would typically send the data to your backend
        // For now, we'll just show a completion message
        setTimeout(() => {
            alert('Congratulations! Your shop has been set up successfully.');
        }, 1000);
    }

    function showToast(message, type = 'info') {
        // Remove existing toasts
        $('.toast-notification').remove();
        
        const toastClass = {
            success: 'alert-success',
            error: 'alert-danger',
            info: 'alert-info',
            warning: 'alert-warning'
        }[type] || 'alert-info';
        
        const toast = $(`
            <div class="toast-notification alert ${toastClass} alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                <span>${message}</span>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('body').append(toast);
        
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Initialize character count
    updateCharCount();
    
    // Initialize SKU input state
    toggleSkuInput();
    
    // Add smooth scrolling for step 3
    $('#step-3').on('shown', function() {
        const formContainer = $('.product-form-container');
        if (formContainer.length) {
            // Add custom scrollbar styling
            formContainer.addClass('custom-scrollbar');
        }
    });

    // Handle form submission prevention
    $('form').on('submit', function(e) {
        e.preventDefault();
    });

    // Add loading states for better UX
    $('.btn').on('click', function() {
        const btn = $(this);
        const originalText = btn.text();
        
        btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Loading...');
        
        setTimeout(() => {
            btn.prop('disabled', false).text(originalText);
        }, 500);
    });

    // Add hover effects for interactive elements
    $('.theme-card, .flow-box, .form-control').hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );

    // Initialize wizard with fade-in animation
    $('.wizard-container').addClass('fade-in');
    
    // Add responsive behavior for mobile
    function handleResponsive() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            $('.product-form-wrapper').css('max-height', 'none');
            $('.product-preview-section').css('position', 'static');
        } else {
            $('.product-form-wrapper').css('max-height', '80vh');
            $('.product-preview-section').css('position', 'sticky');
        }
    }

    // Handle window resize
    $(window).on('resize', handleResponsive);
    handleResponsive(); // Initial call

    // Add focus management for accessibility
    $('.btn-next, .btn-back').on('click', function() {
        setTimeout(() => {
            $('.step-content.active').find('input, textarea, select').first().focus();
        }, 300);
    });

    // Add keyboard navigation
    $(document).on('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.which) {
                case 37: // Left arrow
                    if (currentStep > 1) {
                        e.preventDefault();
                        goToStep(currentStep - 1);
                    }
                    break;
                case 39: // Right arrow
                    if (currentStep < 3 && validateCurrentStep()) {
                        e.preventDefault();
                        goToStep(currentStep + 1);
                    }
                    break;
            }
        }
    });
});
