import React from "react";
interface LegalProps {
    NEXT_ENV_PUBLIC_TRACKING_ID: string | undefined;
}
interface LegalState {
    clientLoaded: boolean;
}
export default class Legal extends React.Component<LegalProps, LegalState> {
    state: LegalState;
    private ref;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
