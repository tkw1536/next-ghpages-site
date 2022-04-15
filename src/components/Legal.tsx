import React from "react"
import Head from "next/head"

interface LegalProps {
    NEXT_ENV_PUBLIC_TRACKING_ID: string | undefined
}

interface LegalState {
    clientLoaded: boolean;
}

const LEGAL_SCRIPT = "https://inform.everyone.wtf/legal.min.js" // will be loaded directly
const TRACK_SCRIPT = "https://track.everyone.wtf/tracker.js" // will be loaded by the script above

export default class Legal extends React.Component<LegalProps, LegalState> {
    state: LegalState = {
        clientLoaded: false,
    }
    private ref = React.createRef<HTMLParagraphElement>()
    componentDidMount() {
        const { NEXT_ENV_PUBLIC_TRACKING_ID } = this.props
        
        const script = document.createElement("script")
        script.setAttribute("src", LEGAL_SCRIPT)
        if (NEXT_ENV_PUBLIC_TRACKING_ID) {
            script.setAttribute("data-site-id", NEXT_ENV_PUBLIC_TRACKING_ID)
        }
        script.onload = () => { this.setState({ clientLoaded: true }) }

        this.ref.current!.appendChild(script)
    }
    render() {
        const { NEXT_ENV_PUBLIC_TRACKING_ID } = this.props
        const { clientLoaded } = this.state

        return <>
            <Head>
                <link rel="preload" href={LEGAL_SCRIPT} as="script" />
                <link rel="preload" href={TRACK_SCRIPT} as="script" />
            </Head>
            <p style={clientLoaded ? undefined : { display: "none" }} ref={this.ref} />
            {(!clientLoaded) &&
                <p>
                    {/* this should be kept in sync with the legal script to reserve space on the page and prevent re-flows */}
                    For legal reasons I must link <a href="https://inform.everyone.wtf" target="_blank" rel="noreferrer">my Privacy Policy and Imprint</a>. 
                    { NEXT_ENV_PUBLIC_TRACKING_ID && <span style={{ visibility: "hidden" }}><a>Opt-Out of Stats</a>. </span> }
                </p>
            }
        </>
    }
}
