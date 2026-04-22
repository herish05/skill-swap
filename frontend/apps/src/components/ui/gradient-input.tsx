import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const GradientInput = React.forwardRef<HTMLInputElement, GradientInputProps>(
  ({ icon, ...props }, ref) => {
    return (
      <div style={{ position: "relative", width: "100%" }}>
        {icon && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
        )}

        <input
          ref={ref}
          style={{
            width: "100%",
            height: "50px",
            paddingLeft: icon ? "40px" : "12px",
          }}
          {...props}
        />
      </div>
    );
  },
);
GradientInput.displayName = "GradientInput";

export { GradientInput };
