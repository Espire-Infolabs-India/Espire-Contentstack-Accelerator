"use client";
import{ useState, useEffect } from "react";
import Image from "next/image";
import { Box, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";




export default function ProductCrousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "/images/hero_banner.webp",
    "/images/hero_banner_1.jpg",
    "/images/hero_banner_2.webp",
    "/images/hero_banner_3.jpg",
  ];

 
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

 
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

 
  const handleThumbnailClick = (index: any) => {
    setActiveIndex(index);
  };

  useEffect(()=>{
    setActiveIndex(0)
  },[])

  return (
    <>
      <Box className="block">
        {/* Main Image Slider */}
        <Box className="relative flex items-center" >
          <Image src={images[activeIndex]} width={400} height={400} alt="" unoptimized />

          {/* Navigation Buttons */}
          <Button
            onClick={handlePrev}
            style={{
                position:"absolute",
            }}
          >
           <ArrowBackIosIcon />
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-10 z-10"
          >
          
          <ArrowForwardIosIcon />
          </Button>
        </Box>

        {/* Thumbnails */}
        <Grid container spacing={1} justifyContent="center" marginTop={3}>
          {images.map((img, index) => (
            <div key={index}>
              <Image
                src={img}
                width={60}
                height={60}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover border-2 rounded-lg cursor-pointer ${
                  index === activeIndex
                    ? "border-blue-500 scale-105"
                    : "border-gray-300"
                }`}
                unoptimized
              />
            </div>
          ))}
        </Grid>
      </Box>
    </>
  );
}
