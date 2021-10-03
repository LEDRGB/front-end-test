import React from 'react';
import { Breadcrums } from './Breadcrums'
import { animations } from 'react-animation'
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import BrokenImage from "@material-ui/icons/BrokenImage";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const style = {
  animation: animations.popIn
}

export class Header extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
      return (
        ! this.props.beautify 
        ? <header className="app-header" >
            <div 
              className="app-header-text"
              onClick={(() => this.props.setSelectedItem(undefined))}
              >
                HEADER
            </div>
            <div>
              Shopping cart {this.props.cart}
            </div>
            <div onClick={() => this.props.setBeautify(true)}>
              Beautify
            </div>
            <Breadcrums setSelectedItem={this.props.setSelectedItem} selectedItem={this.props.selectedItem}/> 
          </header> 
        : <header className="app-header-beauty" style={ style } onClick={(() => this.props.setSelectedItem(undefined))}>
            <Breadcrums setSelectedItem={this.props.setSelectedItem} selectedItem={this.props.selectedItem}/> 
            <div 
            className="app-header-text"            
            >
            </div>
              <div className="beauty-butttons-container">
              <TextField      
                onChange={(evt) => {this.props.handleOnSearch(evt.target.value)}}          
                InputProps={{                  
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {/* <Search handleOnChange={this.props.handleOnSearch}/> */}
              <div>
              <Tooltip title="Uglify">
                  <Button
                  onClick={() => {
                    this.props.setBeautify(false);
                  }}
                >
                  {" "}
                  <BrokenImage fontSize="small" />
                </Button>
              </Tooltip>
                <Tooltip title="Cart">
                    <Badge color="secondary" badgeContent={this.props.cart}>
                      <ShoppingCartIcon />{" "}
                    </Badge>
                </Tooltip>
                </div>
            </div>
        </header> 
      )
    }
}