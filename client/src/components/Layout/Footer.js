import React, { Component } from 'react';
import './footer.css';

var style = {
      backgroundColor: "#F8F8F8",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "20px",
       position: "fixed",
      left: "0",
      bottom: "0",
      height: "60px",
      width: "100%",
  }
  
  var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  }

  function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
                <p>This is Footer</p>
            </div>
        </div>
    )
  }
  export default Footer

  // class Footer extends Component {

  //   render() { 
  //     return (
  //       <div class="footer">
  //         <p>Place sticky footer content here.</p>\
  //     </div>
    
    
  //     );
  //   }
  // }
  // export default Footer