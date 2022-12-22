import React, { Component } from "react";
import "./../experienceAccordion/ExperienceAccordion.css";
import { Accordion, Panel } from "baseui/accordion";
import SkillsCard from "./SkillsCard.js";

class SkillsAccordion extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="experience-accord">
        <Accordion onChange={({ expanded }) => console.log()}>
          {this.props.sections.map((section) => {
            return (
              <Panel
                className="accord-panel"
                title={section["title"]}
                key={section["title"]}
              >
                {section["experiences"].map((skilled) => {
                  return <SkillsCard skilled={skilled} theme={theme} />;
                })}
              </Panel>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default SkillsAccordion;
