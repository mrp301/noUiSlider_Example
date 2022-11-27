import { useRef, useEffect, useMemo } from "react";
import noUiSLider from "nouislider";
import "nouislider/dist/nouislider.min.css";
import "./slider.css";


export const Slider = ({ type, value, inistalValue, dispatch }) => {
  const sliderRef = useRef(null);
  const sliderInstance = useRef(null);

  const option = useMemo(() => ({
    start: inistalValue,
    animate: false,
    connect: true,
    range: {
      min: 10,
      max: 100,
    },
    step: 1,
  }), [inistalValue]);

  useEffect(() => {
    if (!sliderRef.current) return;

    console.log('slider create')
    sliderInstance.current = noUiSLider.create(sliderRef.current, option);
    sliderInstance.current.on('slide', ([value]) => {
      console.log(value);
      dispatch({
        type,
        value: Math.round(value),
      })
    })

    return () => {
      sliderInstance.current?.destroy();
    }
  }, [type, option, dispatch, sliderRef])

  useEffect(() => {
    if (!sliderInstance.current) return

    sliderInstance.current.set(value)
  }, [value])

  return (
    <div className="slider-container">
      <label className="label">{type}</label>
      <div ref={sliderRef} />
      <input
        className="input"
        type="number"
        value={value}
        onChange={(e) => dispatch({
          type,
          value: Math.round(e.target.value)
        })}
      />
    </div>
  )
}
