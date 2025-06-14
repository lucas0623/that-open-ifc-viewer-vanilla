import * as OBC from "@thatopen/components";

export class FragmentOperations {
  private fragments: OBC.FragmentsManager;

  constructor(components: OBC.Components) {
    this.fragments = components.get(OBC.FragmentsManager);
  }

  exportFragments() {
    if (!this.fragments?.groups.size) {
      console.log("No fragments to export");
      return;
    }

    const group = Array.from(this.fragments.groups.values())[0];
    const data = this.fragments.export(group);
    
    // Create and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([data]));
    link.download = "model.frag";
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Export properties if available
    const properties = group.getLocalProperties?.();
    if (properties) {
      const propLink = document.createElement("a");
      propLink.href = URL.createObjectURL(new Blob([JSON.stringify(properties)]));
      propLink.download = "model.json";
      document.body.appendChild(propLink);
      propLink.click();
      propLink.remove();
    }
  }

  disposeFragments() {
    if (this.fragments) {
      this.fragments.dispose();
    }
  }
} 