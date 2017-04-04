import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class TermsPage extends Component {
    constructor() {
        super();

        this.styles = {
            main: {
                maxWidth: 800,
                margin: 40
            }
        };
    }

    render() {
        return (
            <Paper>
                <div style={ this.styles.main }>
                    <h3>Copyright Policy</h3>
                    <p>                        
                        Praesent dui eros, sollicitudin nec vehicula vitae, semper in neque. Vivamus sapien arcu, commodo faucibus dolor facilisis, interdum varius ante. Nullam vel lorem a metus maximus congue. Donec et ultrices metus, ac fermentum ex. Integer egestas augue ac lectus rhoncus, ac placerat elit feugiat. Sed fringilla malesuada leo, a congue est vestibulum nec. In elementum viverra arcu, ut tincidunt ante. Ut id bibendum nunc. Praesent erat tortor, egestas id purus id, pretium interdum est. Aliquam erat volutpat. In ornare mollis fermentum. Curabitur id lorem a nulla posuere interdum. Etiam bibendum, felis eu egestas auctor, justo quam tristique ante, a finibus est ligula at tortor.
                    </p>
                    <p>
                        Suspendisse potenti. In varius pretium tincidunt. Donec vehicula viverra eros, vel fermentum nisl ultrices ut. Integer aliquet eu turpis at efficitur. Praesent aliquet ultricies consectetur. Aliquam pretium leo hendrerit, fermentum dolor sit amet, hendrerit lectus. Nam ut tristique sem. Cras lacinia vel tortor ac lobortis.
                    </p>
                    <p>
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer congue quam erat, vel rhoncus neque molestie in. Proin porta lorem odio, cursus luctus tortor laoreet sit amet. Curabitur dignissim erat eget enim pulvinar, a congue ligula auctor. Nunc sagittis lacus urna, ac interdum est suscipit sed. Aenean suscipit tortor sit amet nisi pulvinar auctor eget et massa. Phasellus elementum eleifend leo et accumsan. Nunc a sem vel lectus sodales consequat. Nullam sit amet sodales massa, sit amet feugiat ligula. Donec in cursus risus. Praesent lacus dui, tristique nec dignissim ac, dignissim convallis enim. Quisque ut tellus sit amet ex elementum ultricies. Nulla vel libero vehicula, congue turpis ac, semper erat. Praesent scelerisque lacinia neque, sit amet ornare risus dictum non. Suspendisse et condimentum nunc, quis fringilla nulla. Donec posuere arcu quis sollicitudin bibendum.
                    </p>
                    <h3>Intellectual Property</h3>
                    <p>
                        Mauris cursus velit erat, vitae scelerisque mi hendrerit quis. Mauris non felis eu eros ultrices aliquam. Aliquam porttitor at turpis molestie lobortis. Integer rhoncus tincidunt eros, id viverra augue elementum vitae. Duis ut sollicitudin sem. Praesent eleifend est vel tortor pellentesque aliquet. Nulla pharetra diam eget massa consectetur, a bibendum ipsum faucibus.
                    </p>
                    <p>
                        Vivamus lacinia arcu vel porta fringilla. Cras quis pellentesque est. Ut cursus nisl eget nisl malesuada, et ultricies massa pharetra. Cras vitae dolor rutrum, commodo dolor et, dignissim eros. Vivamus fermentum, ipsum sit amet scelerisque porta, nisi turpis egestas ligula, in vehicula enim massa nec ex. Ut a augue tempus, pulvinar magna in, iaculis ante. Nulla mi ante, consectetur ac gravida et, ultrices et nunc.
                    </p>
                    <h3>Termination</h3>
                    <p>
                        Ut cursus, nibh at luctus luctus, est nisl congue ex, quis eleifend odio quam ut turpis. Suspendisse vehicula porttitor commodo. Nam et risus quis metus elementum pretium. Sed condimentum purus vitae efficitur tempor. Suspendisse sed velit dignissim sapien eleifend maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum congue pulvinar odio in imperdiet. Phasellus quis dolor tristique, euismod nulla nec, vestibulum nulla. Maecenas efficitur neque sit amet eros malesuada, eget venenatis dui sagittis. Aenean feugiat nisl lacus, in ultrices erat imperdiet vitae. Phasellus scelerisque aliquet orci.
                    </p>
                    <p>
                        In id purus auctor, pretium urna vitae, maximus turpis. Sed mollis lorem et semper bibendum. Cras hendrerit, sapien non mattis porttitor, velit enim scelerisque nisl, nec suscipit ante elit et sapien. Fusce accumsan consectetur velit, at ornare nunc commodo id. Proin tincidunt in magna sit amet consectetur. Quisque vel magna consequat, laoreet libero blandit, congue lorem. Phasellus gravida tellus sagittis mi egestas, eget lacinia sapien efficitur.
                    </p>
                    <p>
                        Maecenas in odio commodo, maximus lacus sit amet, dapibus elit. Quisque pretium mollis nibh efficitur commodo. Aliquam in enim vehicula ligula iaculis porta. Fusce commodo dui sit amet auctor porttitor. Donec pulvinar mauris arcu, id bibendum enim aliquet id. Sed volutpat imperdiet turpis condimentum consectetur. Integer hendrerit ex pharetra nunc auctor congue. Vivamus ullamcorper arcu in sollicitudin maximus. Ut tempus ut sem sit amet tincidunt. Nunc nulla sapien, commodo faucibus accumsan sit amet, ornare eu magna. Sed augue nisl, tincidunt eget lobortis id, dignissim vel mi. Quisque sed augue ante. Morbi nec ex tellus. Sed luctus neque non ligula dapibus rhoncus. Ut vitae volutpat purus. Pellentesque et laoreet quam, eget dictum turpis.
                    </p>
                    <h3>Contact Us</h3>
                    <p>
                        If you have any questions about these Terms, please contact us.
                    </p>
                </div>
            </Paper>
        );
    }
}

export default TermsPage;