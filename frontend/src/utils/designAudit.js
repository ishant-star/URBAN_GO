// Design System Audit Utility
// This utility helps identify design inconsistencies and accessibility issues

export const auditDesignSystem = () => {
  const issues = [];
  
  // 1. Check for color contrast issues
  const checkColorContrast = () => {
    const elements = document.querySelectorAll('*');
    const contrastIssues = [];
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const bgColor = styles.backgroundColor;
      const textColor = styles.color;
      
      // Log elements with potential contrast issues
      if (bgColor.includes('emerald') || textColor.includes('emerald')) {
        contrastIssues.push({
          element: el.tagName,
          className: el.className,
          bgColor,
          textColor
        });
      }
    });
    
    return contrastIssues;
  };
  
  // 2. Check for inconsistent spacing
  const checkSpacing = () => {
    const spacingElements = document.querySelectorAll('[class*="p-"], [class*="m-"], [class*="gap-"]');
    const spacingValues = new Set();
    
    spacingElements.forEach(el => {
      const classes = el.className.split(' ');
      classes.forEach(cls => {
        if (cls.match(/^[pm][trblxy]?-\d+$/)) {
          spacingValues.add(cls);
        }
      });
    });
    
    return Array.from(spacingValues);
  };
  
  // 3. Check for typography inconsistencies
  const checkTypography = () => {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
    const fontSizes = new Set();
    
    textElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      fontSizes.add(styles.fontSize);
    });
    
    return Array.from(fontSizes);
  };
  
  // 4. Check for mobile responsiveness issues
  const checkMobileResponsiveness = () => {
    const mobileBreakpoints = ['sm:', 'md:', 'lg:', 'xl:'];
    const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
    
    return {
      totalElements: document.querySelectorAll('*').length,
      responsiveElements: responsiveElements.length,
      responsivePercentage: (responsiveElements.length / document.querySelectorAll('*').length * 100).toFixed(2)
    };
  };
  
  // Run all audits
  const results = {
    timestamp: new Date().toISOString(),
    colorContrast: checkColorContrast(),
    spacing: checkSpacing(),
    typography: checkTypography(),
    mobileResponsiveness: checkMobileResponsiveness()
  };
  
  console.group('🔍 Design System Audit Results');
  console.log('📊 Full Audit Results:', results);
  console.log('🎨 Unique Font Sizes Found:', results.typography.length);
  console.log('📱 Mobile Responsive Coverage:', results.mobileResponsiveness.responsivePercentage + '%');
  console.log('🎯 Spacing Classes Used:', results.spacing.length);
  console.groupEnd();
  
  return results;
};

// Accessibility audit
export const auditAccessibility = () => {
  const issues = [];
  
  // Check for missing alt text
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt || img.alt.trim() === '') {
      issues.push({
        type: 'missing-alt-text',
        element: img,
        src: img.src
      });
    }
  });
  
  // Check for missing form labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label && !input.getAttribute('aria-label')) {
      issues.push({
        type: 'missing-label',
        element: input,
        id: input.id
      });
    }
  });
  
  // Check for keyboard navigation
  const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
  interactiveElements.forEach(el => {
    if (el.tabIndex === -1 && !el.disabled) {
      issues.push({
        type: 'keyboard-navigation',
        element: el
      });
    }
  });
  
  console.group('♿ Accessibility Audit Results');
  console.log('🚨 Total Issues Found:', issues.length);
  console.log('📝 Detailed Issues:', issues);
  console.groupEnd();
  
  return issues;
};

// Performance audit for UI components
export const auditPerformance = () => {
  const metrics = {
    totalElements: document.querySelectorAll('*').length,
    totalImages: document.querySelectorAll('img').length,
    totalScripts: document.querySelectorAll('script').length,
    totalStylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
    domDepth: Math.max(...Array.from(document.querySelectorAll('*')).map(el => {
      let depth = 0;
      let parent = el.parentElement;
      while (parent) {
        depth++;
        parent = parent.parentElement;
      }
      return depth;
    }))
  };
  
  console.group('⚡ Performance Audit Results');
  console.log('📊 DOM Metrics:', metrics);
  console.groupEnd();
  
  return metrics;
};

// Main audit function
export const runCompleteAudit = () => {
  console.log('🔍 Starting Complete UI/UX Audit...');
  
  const results = {
    designSystem: auditDesignSystem(),
    accessibility: auditAccessibility(),
    performance: auditPerformance()
  };
  
  // Generate recommendations
  const recommendations = generateRecommendations(results);
  
  console.group('💡 Audit Recommendations');
  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
  });
  console.groupEnd();
  
  return { results, recommendations };
};

const generateRecommendations = (auditResults) => {
  const recommendations = [];
  
  // Design system recommendations
  if (auditResults.designSystem.typography.length > 12) {
    recommendations.push('Reduce font size variations - currently using ' + auditResults.designSystem.typography.length + ' different sizes');
  }
  
  if (auditResults.designSystem.mobileResponsiveness.responsivePercentage < 50) {
    recommendations.push('Improve mobile responsiveness - only ' + auditResults.designSystem.mobileResponsiveness.responsivePercentage + '% of elements are responsive');
  }
  
  // Accessibility recommendations
  if (auditResults.accessibility.length > 0) {
    recommendations.push(`Fix ${auditResults.accessibility.length} accessibility issues found`);
  }
  
  // Performance recommendations
  if (auditResults.performance.domDepth > 15) {
    recommendations.push('Reduce DOM depth - currently at ' + auditResults.performance.domDepth + ' levels');
  }
  
  return recommendations;
};