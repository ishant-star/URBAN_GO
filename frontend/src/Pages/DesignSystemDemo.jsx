import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  Navigation, 
  LoadingSpinner, 
  Alert 
} from '../design-system/components';
import { runCompleteAudit } from '../utils/designAudit';
import { 
  FaHome, 
  FaUser, 
  FaShoppingCart, 
  FaHeart,
  FaSearch,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const DesignSystemDemo = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [auditResults, setAuditResults] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleRunAudit = () => {
    setLoading(true);
    setTimeout(() => {
      const results = runCompleteAudit();
      setAuditResults(results);
      setLoading(false);
      setShowAlert(true);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 mb-4">
            Design System <span className="text-green-600">Demo</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Comprehensive UI/UX redesign showcasing modern design principles, 
            accessibility standards, and responsive components.
          </p>
        </div>

        {/* Audit Section */}
        <Card className="mb-12" padding="lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Design System Audit
            </h2>
            <p className="text-neutral-600 mb-6">
              Run a comprehensive audit to validate accessibility, performance, and design consistency.
            </p>
            
            <Button
              onClick={handleRunAudit}
              loading={loading}
              size="lg"
              className="mb-6"
            >
              {loading ? 'Running Audit...' : 'Run Complete Audit'}
            </Button>

            {loading && (
              <div className="flex justify-center">
                <LoadingSpinner size="lg" text="Analyzing design system..." />
              </div>
            )}

            {auditResults && (
              <div className="mt-6 text-left">
                <Alert type="success" title="Audit Complete!" className="mb-4">
                  Design system audit completed successfully. Check browser console for detailed results.
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card padding="md" className="text-center">
                    <h3 className="font-semibold text-neutral-800">Typography</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {auditResults.results.designSystem.typography.length}
                    </p>
                    <p className="text-sm text-neutral-600">Font sizes used</p>
                  </Card>
                  
                  <Card padding="md" className="text-center">
                    <h3 className="font-semibold text-neutral-800">Mobile Coverage</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {auditResults.results.designSystem.mobileResponsiveness.responsivePercentage}%
                    </p>
                    <p className="text-sm text-neutral-600">Responsive elements</p>
                  </Card>
                  
                  <Card padding="md" className="text-center">
                    <h3 className="font-semibold text-neutral-800">Accessibility</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {auditResults.results.accessibility.length === 0 ? '✓' : auditResults.results.accessibility.length}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {auditResults.results.accessibility.length === 0 ? 'No issues' : 'Issues found'}
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Buttons Section */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Button Components</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-700 mb-3">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-700 mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-700 mb-3">With Icons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<FaHome />}>Home</Button>
                  <Button rightIcon={<FaShoppingCart />}>Add to Cart</Button>
                  <Button leftIcon={<FaHeart />} variant="outline">Favorite</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Form Components */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Form Components</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                leftIcon={<FaUser />}
                placeholder="Enter your full name"
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                leftIcon={<FaEnvelope />}
                placeholder="Enter your email"
                required
              />
              
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                leftIcon={<FaPhone />}
                placeholder="Enter your phone number"
                helperText="We'll never share your phone number"
              />
              
              <Input
                label="Search"
                name="search"
                leftIcon={<FaSearch />}
                rightIcon={<Button variant="ghost" size="sm">Go</Button>}
                placeholder="Search products..."
              />
              
              <Input
                label="Error Example"
                name="error"
                error="This field has an error"
                placeholder="This input has an error state"
              />
              
              <Button type="submit" fullWidth>
                Submit Form
              </Button>
            </form>
          </Card>
        </div>

        {/* Alert Examples */}
        <Card padding="lg" className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Alert Components</h2>
          
          <div className="space-y-4">
            <Alert type="success" title="Success!" dismissible onDismiss={() => {}}>
              Your order has been placed successfully and will be delivered within 30 minutes.
            </Alert>
            
            <Alert type="warning" title="Warning">
              Your cart will expire in 10 minutes. Please complete your purchase.
            </Alert>
            
            <Alert type="error" title="Error" dismissible onDismiss={() => {}}>
              Payment failed. Please check your card details and try again.
            </Alert>
            
            <Alert type="info" title="Information">
              Free delivery is available for orders over ₹500 in your area.
            </Alert>
          </div>
        </Card>

        {/* Loading States */}
        <Card padding="lg" className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Loading States</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-neutral-700 mb-3">Small</h3>
              <LoadingSpinner size="sm" />
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-neutral-700 mb-3">Medium</h3>
              <LoadingSpinner size="md" />
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-neutral-700 mb-3">Large</h3>
              <LoadingSpinner size="lg" />
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-neutral-700 mb-3">With Text</h3>
              <LoadingSpinner size="md" text="Loading..." />
            </div>
          </div>
        </Card>

        {/* Typography Scale */}
        <Card padding="lg" className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Typography Scale</h2>
          
          <div className="space-y-4">
            <h1 className="text-6xl">Heading 1 - Hero Title</h1>
            <h2 className="text-5xl">Heading 2 - Section Title</h2>
            <h3 className="text-4xl">Heading 3 - Subsection</h3>
            <h4 className="text-3xl">Heading 4 - Card Title</h4>
            <h5 className="text-2xl">Heading 5 - Component Title</h5>
            <h6 className="text-xl">Heading 6 - Small Title</h6>
            <p className="text-lg">Large paragraph text for important content</p>
            <p className="text-base">Base paragraph text for regular content</p>
            <p className="text-sm">Small text for captions and helper text</p>
            <p className="text-xs">Extra small text for fine print</p>
          </div>
        </Card>

        {/* Color Palette */}
        <Card padding="lg">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Color Palette</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-700 mb-4">Primary Colors</h3>
              <div className="grid grid-cols-5 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-full h-12 rounded-lg bg-green-${shade} border border-neutral-200`}
                    />
                    <p className="text-xs text-neutral-600 mt-1">{shade}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-700 mb-4">Neutral Colors</h3>
              <div className="grid grid-cols-5 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-full h-12 rounded-lg bg-neutral-${shade} border border-neutral-200`}
                    />
                    <p className="text-xs text-neutral-600 mt-1">{shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Success Alert */}
        {showAlert && (
          <div className="fixed bottom-4 right-4 z-50">
            <Alert 
              type="success" 
              title="Demo Interaction!" 
              dismissible 
              onDismiss={() => setShowAlert(false)}
            >
              You've successfully interacted with the redesigned components!
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignSystemDemo;