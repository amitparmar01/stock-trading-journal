import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class AddTrade extends Component {
    constructor() {
        super();
        
        this.state = {
        }

        this.styles = {
            main: {
                display: 'flex',
                //justifyContent: 'space-between',
                flexFlow: 'row wrap'
            },
            textbox: {
                marginRight: 80
            },
            textarea: {
                resize: 'none'
            }
        };

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={ true } onTouchTap={ this.onClose } />,
            <FlatButton label="Add" primary={ true } onTouchTap={ this.onClose } />
        ];

        return (
            <div>
                <Dialog title="Dialog With Actions" actions={ actions } open={ this.props.Open } onRequestClose={ this.onClose }>
                    <div style={ this.styles.main }>
                        <TextField value={ this.state.symbolValue } floatingLabelText="Symbol" style={ this.styles.textbox } maxLength="10" onChange={ this.symbolChange } errorText={ this.state.symbolError } />
                        <TextField value={ this.state.priceValue } floatingLabelText="Price" style={ this.styles.textbox } onChange={ this.priceChange } errorText={ this.state.priceError } />
                        <TextField value={ this.state.sharesValue } floatingLabelText="Shares" style={ this.styles.textbox } onChange={ this.sharesChange } errorText={ this.state.sharesError } />
                        <TextField value={ this.state.profitTargetValue } floatingLabelText="Profit target" style={ this.styles.textbox } onChange={ this.profitTargetChange } errorText={ this.state.profitTargetError } />
                        <TextField value={ this.state.stopLossValue } floatingLabelText="Stop Loss" style={ this.styles.textbox } onChange={ this.stopLossChange } errorText={ this.state.stopLossError } />
                        <TextField value={ this.state.dateValue } floatingLabelText="Date" style={ this.styles.textbox } onChange={ this.dateChange } errorText={ this.state.dateError } />
                        <TextField value={ this.state.timeValue } floatingLabelText="Time" style={ this.styles.textbox } onChange={ this.timeChange } errorText={ this.state.timeError } />
                        <TextField value={ this.state.commissionValue } floatingLabelText="Commission" style={ this.styles.textbox } onChange={ this.commissionChange } errorText={ this.state.commissionError } />
                        <TextField value={ this.state.entryStrategyValue } floatingLabelText="Entry Strategy" fullWidth={ true } onChange={ this.entryStrategyChange } errorText={ this.state.entryStrategyError } />
                        <TextField value={ this.state.notesValue } floatingLabelText="Notes" style={ this.styles.textarea } maxLength="200" fullWidth={ true } multiLine={ true } rowsMax={ 3 } onChange={ this.notesChange } errorText={ this.state.notesError } />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default AddTrade;