import type { PropertyFeature } from "../../../data/SP-HCM-Q5-A0001-data"

interface PropertyFeaturesProps {
  features: PropertyFeature[]
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="fw-bold mb-4">Đặc điểm bất động sản</h5>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <span className="feature-icon">{feature.icon}</span>
              <div className="feature-content">
                <div className="feature-label">{feature.label}</div>
                <div className="feature-value">{feature.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
