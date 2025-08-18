// src/utils/csvDataValidator.js - Utility for validating CSV data integrity

export const validateDashboardData = (dashboards) => {
  const errors = [];
  const warnings = [];

  dashboards.forEach((dashboard, index) => {
    const rowNum = index + 1;

    // Required fields validation
    if (!dashboard.id) {
      errors.push(`Row ${rowNum}: Missing required field 'id'`);
    }
    if (!dashboard.title || dashboard.title.trim() === '') {
      errors.push(`Row ${rowNum}: Missing required field 'title'`);
    }
    if (!dashboard.owner || dashboard.owner.trim() === '') {
      warnings.push(`Row ${rowNum}: Missing recommended field 'owner'`);
    }

    // Data type validation
    if (dashboard.views && typeof dashboard.views !== 'number') {
      warnings.push(`Row ${rowNum}: 'views' should be a number, got ${typeof dashboard.views}`);
    }
    
    if (dashboard.isFeatured && typeof dashboard.isFeatured !== 'boolean') {
      warnings.push(`Row ${rowNum}: 'isFeatured' should be boolean, got ${typeof dashboard.isFeatured}`);
    }

    if (dashboard.isVideo && typeof dashboard.isVideo !== 'boolean') {
      warnings.push(`Row ${rowNum}: 'isVideo' should be boolean, got ${typeof dashboard.isVideo}`);
    }

    if (dashboard.isRestricted && typeof dashboard.isRestricted !== 'boolean') {
      warnings.push(`Row ${rowNum}: 'isRestricted' should be boolean, got ${typeof dashboard.isRestricted}`);
    }

    // URL validation
    const urlFields = ['dashboardUrl', 'thumbnailUrl', 'imageUrl'];
    urlFields.forEach(field => {
      if (dashboard[field] && dashboard[field] !== '') {
        try {
          new URL(dashboard[field]);
        } catch (e) {
          if (!dashboard[field].startsWith('/')) { // Allow relative URLs
            warnings.push(`Row ${rowNum}: Invalid URL format for '${field}': ${dashboard[field]}`);
          }
        }
      }
    });

    // Date validation
    const dateFields = ['createdAt', 'updatedAt'];
    dateFields.forEach(field => {
      if (dashboard[field]) {
        const date = new Date(dashboard[field]);
        if (isNaN(date.getTime())) {
          warnings.push(`Row ${rowNum}: Invalid date format for '${field}': ${dashboard[field]}`);
        }
      }
    });

    // Email validation
    if (dashboard.contactEmail && dashboard.contactEmail !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dashboard.contactEmail)) {
        warnings.push(`Row ${rowNum}: Invalid email format: ${dashboard.contactEmail}`);
      }
    }

    // Tags validation
    if (dashboard.tags && !Array.isArray(dashboard.tags)) {
      warnings.push(`Row ${rowNum}: 'tags' should be an array, got ${typeof dashboard.tags}`);
    }

    // Check for duplicate IDs
    const duplicateIds = dashboards.filter(d => d.id === dashboard.id);
    if (duplicateIds.length > 1) {
      errors.push(`Duplicate ID found: ${dashboard.id} (appears ${duplicateIds.length} times)`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalRecords: dashboards.length
  };
};

export const logValidationResults = (validationResults) => {
  console.log(`📊 CSV Data Validation Results:`);
  console.log(`   Total Records: ${validationResults.totalRecords}`);
  console.log(`   Valid: ${validationResults.isValid ? '✅' : '❌'}`);
  
  if (validationResults.errors.length > 0) {
    console.error(`   Errors (${validationResults.errors.length}):`);
    validationResults.errors.forEach(error => console.error(`     ❌ ${error}`));
  }
  
  if (validationResults.warnings.length > 0) {
    console.warn(`   Warnings (${validationResults.warnings.length}):`);
    validationResults.warnings.forEach(warning => console.warn(`     ⚠️ ${warning}`));
  }
  
  if (validationResults.errors.length === 0 && validationResults.warnings.length === 0) {
    console.log('   🎉 All data is valid!');
  }
};

// Helper function to clean and prepare CSV data
export const cleanCSVData = (rawData) => {
  return rawData.map((row, index) => {
    const cleaned = {};
    
    // Clean all string fields by trimming whitespace
    Object.keys(row).forEach(key => {
      const cleanKey = key.trim();
      let value = row[key];
      
      if (typeof value === 'string') {
        value = value.trim();
        
        // Convert empty strings to null for optional fields
        if (value === '') {
          value = null;
        }
        
        // Handle special cases for boolean fields
        if (['isVideo', 'isFeatured', 'isRestricted'].includes(cleanKey)) {
          if (value === 'true' || value === '1' || value === 'TRUE' || value === 'True') {
            value = true;
          } else if (value === 'false' || value === '0' || value === 'FALSE' || value === 'False' || value === null) {
            value = false;
          }
        }
        
        // Handle tags field - convert comma-separated string to array
        if (cleanKey === 'tags' && value && typeof value === 'string') {
          value = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        }
      }
      
      cleaned[cleanKey] = value;
    });
    
    // Ensure required fields have defaults if missing
    if (!cleaned.id) {
      cleaned.id = `dash-csv-${index + 1}-${Date.now()}`;
    }
    
    if (!cleaned.views) {
      cleaned.views = 0;
    }
    
    if (!cleaned.accessLevel) {
      cleaned.accessLevel = 'Public';
    }
    
    if (!cleaned.tags || !Array.isArray(cleaned.tags)) {
      cleaned.tags = [];
    }
    
    return cleaned;
  });
};