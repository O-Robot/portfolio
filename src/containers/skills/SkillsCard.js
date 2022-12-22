import React, { Component } from "react";
import "../../components/experienceCard//ExperienceCard.css"


class SkillsCard extends Component {
  render() {
    const skilled = this.props.skilled;
    const theme = this.props.theme;
    return (
      <div
        className="experience-card"
        // style={{ border: `1px solid ${skilled["color"]}` }}
      >
        <div className="experience-card-body-div">
          <div className="experience-card-header-div" style={{display:'block'}}>
            <div className="experience-card-heading-left">
              <h3
                className="experience-card-title"
                style={{ color: theme.text }}
              ><span
              className="iconify"
              data-icon="fa-angle-double-right"
              style={{marginRight:'10px'}}
            ></span>
               {skilled["title"]}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillsCard;
