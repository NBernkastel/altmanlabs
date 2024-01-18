import React, {useRef} from "react";

interface ModePickerProps {
    mode: String;
    setMode: (mode: string) => void;
}

function ModePickerComponent(props: ModePickerProps) {
    let modes: string[] = ["Full", "Short"];
    let refs: React.RefObject<HTMLInputElement>[] = []
    refs[0] = useRef(null)
    refs[1] = useRef(null)

    return (
        <>
            <h3>Output Mode</h3>
            {modes.map((mode: string, index: number) => (
                <span key={index}>
          <input
              type="radio"
              value={mode}
              ref={refs[index]}
              onClick={e => {
                  props.setMode(e.currentTarget.value)
              }}
              name="outputMode"
              defaultChecked={props.mode === mode}
          />
                    {mode}
                  </span>
            ))}
        </>
    );
}

export default ModePickerComponent;
