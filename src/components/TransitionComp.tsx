import { CSSTransition } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";
import "./TransitionComp.css";

const TransitionComp = (props: TransitionProps) => {
    return(
        <CSSTransition {...props}>
            {props.children}
        </CSSTransition>
    )
}

export default TransitionComp;
