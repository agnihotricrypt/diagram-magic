
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

export const CustomNode = ({ data }: { data: { label: string } }) => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-background border">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="flex flex-col">
        <label htmlFor="text" className="text-sm font-medium">
          {data.label}
        </label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag px-2 py-1 rounded border text-sm"
        />
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};
