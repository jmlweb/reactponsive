import React from "react";

const storyInfoDecorator = ({
  title,
  subtitle,
  argsInfo,
  propsInfo,
  intro
}) => storyFn => (
  <div className="story">
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
    {intro && <div>{intro}</div>}
    <div className="content">{storyFn()}</div>
    {(propsInfo || argsInfo) && (
      <>
        <h3>{argsInfo ? "Arguments" : "Props"}</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Required</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {(propsInfo || argsInfo).map(
              ({ name, required, type, description }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{required}</td>
                  <td>{type}</td>
                  <td>{description}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </>
    )}
  </div>
);

export default storyInfoDecorator;
