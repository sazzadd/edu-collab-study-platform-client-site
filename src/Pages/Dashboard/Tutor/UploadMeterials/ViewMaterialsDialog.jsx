import { Dialog, Typography, IconButton } from "@material-tailwind/react"
import { FaTimes, FaCopy, FaExternalLinkAlt, FaTrash } from "react-icons/fa"

const ViewMaterialsDialog = ({ open, handleClose, currentMaterial, materials, handleDelete }) => {
  return (
    <Dialog open={open} handler={handleClose} size="xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">{currentMaterial?.sessionTitle} Materials</Typography>
          <FaTimes className="w-6 h-6 cursor-pointer" onClick={handleClose} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {materials
            .filter((m) => m.sessionId === currentMaterial?._id)
            .map((material) => (
              <div key={material.materialId} className="relative group">
                <img
                  src={material.imageUrl || "/placeholder.svg"}
                  alt={material.materialTitle}
                  className="h-48 w-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <IconButton
                    variant="text"
                    className="bg-white/80"
                    onClick={() => {
                      navigator.clipboard.writeText(material.shareLink)
                      alert("Link copied!")
                    }}
                  >
                    <FaCopy className="w-4 h-4" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    className="bg-white/80 ml-2"
                    onClick={() => window.open(material.shareLink, "_blank")}
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    className="bg-white/80 ml-2"
                    onClick={() => handleDelete(material.materialId)}
                  >
                    <FaTrash className="w-4 h-4 text-red-500" />
                  </IconButton>
                </div>
                <Typography className="mt-2 text-center">{material.materialTitle}</Typography>
              </div>
            ))}
        </div>
      </div>
    </Dialog>
  )
}

export default ViewMaterialsDialog

