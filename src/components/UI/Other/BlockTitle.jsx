import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";

const BlockTitle = ({ title, titleStyle, titleSpan, titleAnimation, titleSpanStyle, subtitle, subtitleStyle, above, aboveStyle }) => {
  const blockAnimation = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: custom => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.2 }
    })
  }
  return (
    <motion.div initial={'hidden'} viewport={{ once: true }} whileInView={'visible'}>
      {above
        ? <p className={aboveStyle}>{above}</p>
        : <></>
      }
      <h2 className={`uppercase ${titleStyle}`}>
        {title
          ? <motion.h1 variants={blockAnimation} custom={2}>{title}</motion.h1>
          : <></>
        }
        {titleSpan
          ? <motion.span variants={blockAnimation} custom={2} className={titleSpanStyle}>{titleSpan}</motion.span>
          : <></>
        }
      </h2>
      {subtitle
        ? <p className={subtitleStyle}>{subtitle}</p>
        : <></>
      }
    </motion.div>
  );
};

export default BlockTitle;