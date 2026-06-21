export type ContentCardProps = {
  title: string;
  text: string;
  bgColor: string;
  textColor: string;
  padding: "compact" | "normal" | "spacious";
  alignment: "left" | "center" | "right";
};

export type ComponentType = "ContentCard";

export type BlockData = {
  id: number;
  componentType: ComponentType;
  props: ContentCardProps;
};
