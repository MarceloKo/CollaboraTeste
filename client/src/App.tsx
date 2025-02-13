import React from 'react';
import './App.css';
import ServerAddressForm from './ServerAddressForm'
import LoaderForm from './LoaderForm'

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            serverAddress: 'https://teste-collabora.lxmrnj.easypanel.host',
            startLoading: false,
            wopiUrl: '',
            token: ''
        };
    }
    handleInputChanged(address: string) {
        this.setState({ serverAddress: address });
    }

    handleSubmit() {
        const wopiClientHost = this.state.serverAddress;
        if (!wopiClientHost) {
            alert('No server address entered');
            return;
        }
        if (!wopiClientHost.startsWith('http')) {
            alert('Warning! You have to specify the scheme protocol too (http|https) for the server address.')
            return;
        }

        const collaboraApi = "https://teste-apicollabora2.lxmrnj.easypanel.host"

        let wopiSrc = `${collaboraApi}/wopi/files/1`;
        // wopiSrc = wopiSrc.replace("http://", "https://");   
        fetch(`${collaboraApi}/collaboraUrl?server=${wopiClientHost}`)
            .then(response => response.json())
            .then(data => {
                const wopiClientUrl = data.url
                const accessToken = "seuTokenValido";
                const wopiUrl = `${wopiClientUrl}WOPISrc=${wopiSrc}&access_token=seuTokenValido`;
                console.log(`wopiUrl: ${wopiUrl}`)
                this.setState({
                    startLoading: true,
                    wopiUrl: wopiUrl,
                    token: accessToken
                })
            })

        const collaboraApi2 = "https://teste-apicollabora.lxmrnj.easypanel.host"

        fetch(`${collaboraApi2}/collaboraUrl?server=${wopiClientHost}`)
            .then(response => response.json())
            .then(data => {
                const wopiClientUrl = data.url
                const accessToken = "seuTokenValido";
                const wopiUrl = `${wopiClientUrl}WOPISrc=${wopiSrc}&access_token=seuTokenValido`;
                console.log(`wopiUrl: ${wopiUrl}`)
                this.setState({
                    startLoading: true,
                    wopiUrl: wopiUrl,
                    token: accessToken
                })
            })
    }

    componentDidUpdate() {
        if (this.state.startLoading) {
            this.setState({ startLoading: false })
        }
    }

    render() {
        let loaderForm;
        if (this.state.startLoading) {
            loaderForm = <LoaderForm
                url={this.state.wopiUrl}
                token={this.state.token}
            />
        }

        return (
            <div className="App">
                <ServerAddressForm
                    address={this.state.serverAddress}
                    onChange={this.handleInputChanged}
                    onSubmit={this.handleSubmit} />
                {loaderForm}
                <iframe title="Collabora Online Viewer" id="collabora-online-viewer" name="collabora-online-viewer" allow="clipboard-read *; clipboard-write *">
                </iframe>
            </div>
        );
    }
}

export default App;
