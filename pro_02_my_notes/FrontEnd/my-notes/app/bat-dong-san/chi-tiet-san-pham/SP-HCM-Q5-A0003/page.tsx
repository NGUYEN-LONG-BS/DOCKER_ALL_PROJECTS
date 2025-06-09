import "./styles/main.css"
import "./styles/components.css"
import PropertyHeader from "./component/property-header"
import PropertyGallery from "./component/property-gallery"
import PropertyDetails from "./component/property-details"
import PropertyFeatures from "./component/property-features"
import LocationSidebar from "../../component/location-sidebar"
import PropertyMap from "./component/property-map"
import { propertyData } from "./data/property-data"
import { DatNenNhaRieng, canHoChungCu, relatedProperties, supportServices } from "../../data/sideBar-data"

export default function SanPhamPage() {
  return (
    <div className="min-vh-100 bg-light">
      <PropertyHeader contact={propertyData.contact} />

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-white rounded p-4 mb-4">
              <PropertyGallery images={propertyData.images} title={propertyData.title} />
            </div>

            <PropertyDetails property={propertyData} />
            <PropertyFeatures features={propertyData.features} />
            <PropertyMap />
          </div>

          <div className="col-lg-4">
            <LocationSidebar
              suggestions={DatNenNhaRieng}
              canHoChungCuDucHoaLongAns={canHoChungCu}
              relatedProperties={relatedProperties}
              supportServices={supportServices}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
