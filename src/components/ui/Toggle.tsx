import styles from "./Toggle.module.sass"
interface IProps {
  className?: string
}
function Toggle(props: IProps) {
  console.log(props.className)
  let className = styles.toggle + " " + props?.className
  return (
    <div className={className}>
      Toggle UI
    </div>
  );
}

export default Toggle;