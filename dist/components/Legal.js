"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const head_1 = __importDefault(require("next/head"));
const LEGAL_SCRIPT = "https://inform.everyone.wtf/legal.min.js"; // will be loaded directly
const TRACK_SCRIPT = "https://track.everyone.wtf/tracker.js"; // will be loaded by the script above
class Legal extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            clientLoaded: false,
        };
        this.ref = react_1.default.createRef();
    }
    componentDidMount() {
        const { NEXT_ENV_PUBLIC_TRACKING_ID } = this.props;
        const script = document.createElement("script");
        script.setAttribute("src", LEGAL_SCRIPT);
        if (NEXT_ENV_PUBLIC_TRACKING_ID) {
            script.setAttribute("data-site-id", NEXT_ENV_PUBLIC_TRACKING_ID);
        }
        script.onload = () => { this.setState({ clientLoaded: true }); };
        this.ref.current.appendChild(script);
    }
    render() {
        const { NEXT_ENV_PUBLIC_TRACKING_ID } = this.props;
        const { clientLoaded } = this.state;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(head_1.default, null,
                react_1.default.createElement("link", { rel: "preload", href: LEGAL_SCRIPT, as: "script" }),
                react_1.default.createElement("link", { rel: "preload", href: TRACK_SCRIPT, as: "script" })),
            react_1.default.createElement("p", { style: clientLoaded ? undefined : { display: "none" }, ref: this.ref }),
            (!clientLoaded) &&
                react_1.default.createElement("p", null,
                    "For legal reasons I must link ",
                    react_1.default.createElement("a", { href: "https://inform.everyone.wtf", target: "_blank", rel: "noreferrer" }, "my Privacy Policy and Imprint"),
                    ".",
                    NEXT_ENV_PUBLIC_TRACKING_ID && react_1.default.createElement("span", { style: { visibility: "hidden" } },
                        react_1.default.createElement("a", null, "Opt-Out of Stats"),
                        ". ")));
    }
}
exports.default = Legal;
